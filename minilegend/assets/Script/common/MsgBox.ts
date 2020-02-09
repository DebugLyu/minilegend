import { getRes } from "./gFunc";

interface MsgboxInfo {
    msg: string;
    ok?: () => void;
    cancel?: () => void;
    timeout?: number;
}

class __MsgBox {
    private msgboxPrefab: cc.Prefab = null;
    async init(){
        let msgbox = await getRes("prefab/common/MsgBox", cc.Prefab);
        this.msgboxPrefab = msgbox;
    }

    show(type: number = 0, info: MsgboxInfo){
        let msg = info.msg;
        if(msg == null){
            return;
        }
        let t = cc.instantiate(this.msgboxPrefab);
        let UIMsgBox = t.getComponent("UIMsgBox");
        UIMsgBox.showBox(msg, type, info.ok, info.cancel);
        t.parent = cc.director.getScene();
        if(info.timeout != null){
            setTimeout(() => {
                if(info.ok){
                    info.ok();
                }
                t.destroy();
            }, info.timeout * 1000);
        }
    }
}

let MsgBox = new __MsgBox();
export default MsgBox;