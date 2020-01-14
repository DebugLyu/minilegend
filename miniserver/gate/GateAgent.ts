
import WebSocket = require("ws");
import { Packet } from "../Packet";
import { commander } from "../protocal/sgate";

export class GateAgent {
	// 添加自定义内容
	[x: string]: any;

	agentId: number = 0;
	ws: WebSocket | null = null;
	handles: {[key:number] : (agent:GateAgent, pk: Packet) => void} = {};

	pingtime: number = 0;
	isopen: boolean = false;

	kind:number = 0;
	ip: string = "";
	port: number = 0;


	constructor(id: number = 0, ws: WebSocket) {
		this.agentId = id;
		this.ws = ws;
		this.init()
	}

	init() {
		let msglist: {[key:number] : (agent:GateAgent, pk: Packet) => void} = require("./protocal/gate_c");
		this.handles = msglist;

		this.ws?.on("open", () => {
			console.log("this.ws? on open");
			this.isopen = true;
		});

		this.ws?.on("close", (code: number, reason: string) => {
			console.log(code);
			console.log(reason);
			this.isopen = false;
		});

		this.ws?.on("error", (error: Error) => {
			console.log(error);
		});

		this.ws?.on("ping", (data: Buffer) => {
			this.pingtime = 0;
		});

		this.ws?.on("pong", (data: Buffer) => {

		});

		this.ws?.on("message", (data: WebSocket.Data) => {
			if (data instanceof ArrayBuffer) {
				let pk = Packet.decode(data);
				let func = this.handles[pk.head];
				if(func != null){
					func(this, pk);
				}
				if (pk.head < 10000) {

				} else {
					// 转送到其他服务器

				}
			}
		});
	}

	update(){
		this.pingtime++;
		if (this.pingtime > 30) {
			this.close();
		}
	}

	close(){
		this.isopen = false;
		this.ws?.close();
	}

	ReqServer(pk:commander.sgate.ReqServer){
		this.kind = pk.kind;
	}
}
