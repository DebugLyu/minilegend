// websocket
// import mgen = require("../common/modelGenerate")

import { GateConfig as config } from "../config";
import { getLocalIp } from "../common/gFunc";

function int16ToByte(num: number): Uint8Array {
    //只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
    let bytes: Uint8Array = new Uint8Array(2);
    bytes[0] = num >> 8 & 0xff
    bytes[1] = num & 0xff

    return bytes;
}

function int64ToByte(num: number): Uint8Array {
    //只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
    let bytes: Uint8Array = new Uint8Array(8);
    //没有64位只能前4位补0
    bytes[0] = 0;
    bytes[1] = 0;
    bytes[2] = 0;
    bytes[3] = 0;

    bytes[4] = num >> 24 & 0xff;
    bytes[5] = num >> 16 & 0xff;
    bytes[6] = num >> 8 & 0xff;
    bytes[7] = num & 0xff;
    return bytes;
}
function bytes2int16(arr: Uint8Array): number {
    return ((arr[0] & 0xFF) << 8) | (arr[1] & 0xFF);
}

function bytes2int64(arr: Uint8Array): number {
    //没有64位只能取后四位
    return ((arr[4] & 0xFF) << 24) | ((arr[5] & 0xFF) << 16) | ((arr[6] & 0xFF) << 8) | (arr[7] & 0xFF);
}

// 网络连接 
class WSocket {
    private ws: WebSocket | null = null;
    /**
     * 连接地址
     */
    readonly url: string;
    /**
     * socket发送的数据类型
     */
    readonly dataType: string;
    /**
     * 打开的状态
     */
    isOpen: boolean = false;
    // status
    constructor() {
        this.url = "ws://" + getLocalIp() + "/" + config.port;
        this.dataType = "arraybuffer";

        this.connection(false);
    }

    /**
     * websocket连接
     */
    private connection(isBreak: boolean) {
        this.ws = new WebSocket(this.url)
        this.ws.binaryType = "arraybuffer";

        // 打开方法
        this.ws.onopen = (e: any) => {
            this.isOpen = true
            console.log("web socket link " + this.url + " success, dataType is " + this.dataType)

            // 误删字符串与byte相互转换
            // let str:string="abc"
            // let arr:Array<number>=new Array<number>(0)
            // for (let index = 0; index < str.length; index++) {
            //     console.log(str.charCodeAt(index))
            //     arr.push(str.charCodeAt(index))
            // }
            // console.log(new Uint8Array(arr))


            // let arr:Uint8Array=new Uint8Array(3)
            // arr[0]=97
            // arr[1]=98
            // arr[2]=99
            // let str:string=""
            // for (let index = 0; index < arr.length; index++) {
            //     str+= String.fromCharCode(arr[index])

            // }
            // console.log(str)
            let pk: Packet = new Packet(0, 5, null)
            nat.recPacket(pk)
        }
        // 关闭方法
        this.ws.onclose = (e: any) => {
            this.isOpen = false
            console.log("web socket link " + this.url + " closed, any info is: " + e)
            let pk: Packet = new Packet(0, 3, null)
            nat.recPacket(pk)
        }
        // 错误方法
        this.ws.onerror = (e: any) => {
            console.log("web socket error info is: " + e)
        }
        // 接收
        this.ws.onmessage = (e: any) => {
            let pk: Packet = Packet.decode(new Uint8Array(e.data))
            nat.recPacket(pk)
        }
    }
    /**
     * 发送数据
     */
    send(pk: Packet) {
        if (pk.mainId == 0 && pk.subId == 4) {
            this.connection(true);
            return
        }
        let sendData: Uint8Array = pk.encode()
        this.ws?.send(sendData)
    }
}

// 包信息
class Packet {
    mainId: number
    subId: number
    data: Uint8Array | null
    constructor(mainId: number, subId: number, data: Uint8Array | null) {
        this.mainId = mainId
        this.subId = subId
        this.data = data
    }
    encode(): Uint8Array {
        // if (config.dataType == config.protobuf) {
        //     return this.encodeProtobuf()
        // }
        return this.encodeProtobuf()
    }

    // protobuf编码
    private encodeProtobuf(): Uint8Array {
        //包的总长度
        let all_length: number = 12 + (this.data ? this.data.length : 0);
        //返回的数组
        let myArray: ArrayBuffer = new ArrayBuffer(all_length);
        //以byte形式的数组返回
        let resData: Uint8Array = new Uint8Array(myArray);
        //转换成服务器uint64的包头类型
        let all_length_byte: Uint8Array = int64ToByte(all_length)
        //添加包头
        for (let i: number = 0; i < all_length_byte.length; i++) {
            resData[i] = all_length_byte[i];
        }
        //主命令
        let mainId_byte: Uint8Array = int16ToByte(this.mainId);
        for (let i: number = 0; i < mainId_byte.length; i++) {
            resData[i + 8] = mainId_byte[i];
        }

        //子命令
        let subId_byte: Uint8Array = int16ToByte(this.subId);
        for (let i: number = 0; i < subId_byte.length; i++) {
            resData[i + 10] = subId_byte[i];

        }

        //内容
        if (this.data != null) {
            for (let i: number = 0; i < this.data.length; i++) {
                resData[i + 12] = this.data[i];
            }
        }

        return resData
    }
    IsOpen(): boolean {
        return wsocket.isOpen
    }

    // 解码package
    static decode(recData: Uint8Array): Packet {
        // if (config.dataType == config.protobuf) {
        //     return Packet.decodeProtobuf(recData)
        // }
        return Packet.decodeProtobuf(recData)
    }
    private static decodeProtobuf(recData: Uint8Array): Packet {
        let mainId: number = bytes2int16(recData.slice(8, 10))
        let subId: number = bytes2int16(recData.slice(10, 12))
        return new Packet(mainId, subId, recData.slice(12))
    }
}

// 单例模式
const wsocket = new WSocket()

// 模块处理函数
export class ModuleHandler {
    private mainId: number
    //private handlers: { [key: number]: (mainId: number, subId: number, entity: any) => void } = {}
    public handlers: { [key: number]: ((mainId: number, subId: number, entity: any) => void) | null } = {}
    constructor(mainId: number) {
        this.mainId = mainId
    }

    /**
     * 注册处理函数
     */
    regHandlerFun(subId: number, func: (mainId: number, subId: number, entity: any) => void) {
        this.handlers[subId] = func
    }

    /**
     * 处理接收的信息
     */
    async handler(pk: Packet) {
        let func = this.handlers[pk.subId];
        if (func != null) {
            // func(pk.mainId, pk.subId, mgen.GenModel(pk.mainId, pk.subId, pk.data))
        }
    }

    /**
     * 清除所有的处理函数
     */
    clearHandlers() {
        this.handlers = {}
    }

    /**
     * 清除处理函数
     */
    clearHandler(subId: number) {
        this.handlers[subId] = null
    }
    /**
     * 判断有没有处理函数
     */
    hasHandler(subId: number): boolean {
        if (this.handlers[subId] == null || this.handlers[subId] == undefined) {
            return false
        }
        return true
    }
}

// 网络收发器
class NetAdapter {
    private recPks: Array<Packet> = new Array<Packet>()
    private handlers: { [key: number]: ModuleHandler } = {}

    constructor() {
    }

    /**
     * 得到所有处理函数的信息
     */
    GetHandlers(): { [key: number]: ModuleHandler } {
        return this.handlers
    }

    /**
     * 如果没有相应模块就生成
     */
    private genModule(mainId: number) {
        if (this.handlers[mainId] == null || this.handlers[mainId] == undefined) {
            let mh: ModuleHandler = new ModuleHandler(mainId)
            this.handlers[mainId] = mh
        }
    }

    /**
     * 注册处理函数
     */
    regHandlerFun(mainId: number, subId: number, func: (mainId: number, subId: number, entity: any) => void) {
        this.genModule(mainId)

        this.handlers[mainId].regHandlerFun(subId, func)
    }
    /**
     * 同一模块下注册多个处理函数
     */
    regHandlerFuns(mainId: number, subIds: number[], func: (mainId: number, subId: number, entity: any) => void) {
        if (subIds.length < 1) {
            return
        }

        subIds.forEach(subId => {
            this.regHandlerFun(mainId, subId, func)
        });
    }

    /**
     * 清除模块所有的回调函数
     */
    clearModuleHandlers(mainId: number) {
        this.genModule(mainId)

        this.handlers[mainId].clearHandlers()
    }

    /**
     * 清除一个处理函数
     */
    clearModuleHandler(mainId: number, subId: number) {
        this.genModule(mainId)

        this.handlers[mainId].clearHandler(subId)
    }
    /**
     * 清除一个模块下多个命令的处理函数
     */
    clearModuleHandlerFuns(mainId: number, subIds: number[]) {
        this.genModule(mainId)

        subIds.forEach(subId => {
            this.clearModuleHandler(mainId, subId)
        });
    }

    /**
     * 发送信息
     */
    send(mainId: number, subId: number, data: any) {
        let arr: Uint8Array | null = null
        if (data == null || data == undefined) {
            arr = new Uint8Array(0)
        } else {
            arr = data.finish()
        }
        let pk: Packet = new Packet(mainId, subId, arr)
        wsocket.send(pk)
    }

    /**
     * 接收信息
     */
    recPacket(pk: Packet) {
        this.recPks.push(pk)
        // 没有处理函数的包
        let pks: Array<Packet> = new Array<Packet>()

        let tpk: Packet | undefined = this.recPks.pop()
        while (tpk != null && tpk != undefined) {
            this.genModule(tpk.mainId)
            if (this.handlers[tpk.mainId].hasHandler(tpk.subId)) {
                this.handlers[tpk.mainId].handler(tpk)
            } else {
                pks.push(tpk)
            }
            tpk = this.recPks.pop()
        }
        this.recPks = pks
    }

}

export const nat: NetAdapter = new NetAdapter()