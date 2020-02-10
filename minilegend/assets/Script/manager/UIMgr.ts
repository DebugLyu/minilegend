import { getRes } from "../common/gFunc";
import UIFunc from "../common/UIFunc";

interface MsgboxInfo {
    msg: string;
    ok?: () => void;
    cancel?: () => void;
    timeout?: number;
}

class __UIMgr {
    private prefabList: { [x: string]: cc.Prefab } = {};
    async init() {
        // 通用提示框
        let msgbox = await getRes("prefab/common/MsgBox", cc.Prefab);
        this.prefabList["msgbox"] = msgbox;

        // 通用通知
        let notice = await getRes("prefab/common/Notice", cc.Prefab);
        this.prefabList["notice"] = notice;
    }

    msgBox(type: number = 0, info: MsgboxInfo) {
        let msg = info.msg;
        if (msg == null) {
            return;
        }
        let t = cc.instantiate(this.prefabList["msgbox"]);
        let UIMsgBox = t.getComponent("UIMsgBox");
        UIMsgBox.showBox(msg, type, info.ok, info.cancel);
        t.parent = cc.director.getScene();
        
        if (info.timeout != null) {
            setTimeout(() => {
                if (info.ok) {
                    info.ok();
                }
                t.destroy();
            }, info.timeout * 1000);
        }
    }

    notice(msg: string){
        let notice = cc.instantiate(this.prefabList["notice"]);
        notice.parent = cc.director.getScene();
        let size = cc.director.getWinSize();
        notice.x = size.width / 2;
        notice.y = size.height / 2;

        let t = notice.getComponent("UINotice")
        t.tips = msg;

        cc.tween(notice).set({ scale: 2, opacity: 0})
            .to(0.3, {scale: 1, opacity: 255})
            .delay(2)
            .by(1, {position: cc.v2(0, 200)})
            .by(0.5, {position: cc.v2(0, 100), opacity: -255})
            .start();
    }

    async showUI(path: string) {
        if (this.prefabList[path] == null) {
            this.prefabList[path] = await getRes(path, cc.Prefab);
        }

        let node = cc.instantiate(this.prefabList[path]);
        node.parent = cc.director.getScene();
        let uifunc = node.getComponent(UIFunc);
        if (uifunc == null) {
            uifunc = node.addComponent(UIFunc);
        }

        cc.tween(node)
            .set({ scale: 0.2 })
            .to(0.5, { scale: 1 }, { easing: 'sineOutIn' })
            .call(() => {
                uifunc.showUIComplete();
            })
            .start();
    }

    hideUI(node: cc.Node) {
        let uifunc = node.getComponent(UIFunc);
        cc.tween(node)
            .to(0.5, { scale: 0.2 }, { easing: "sineOutIn"})
            .call(()=>{
                uifunc.hideUIComplete();
            })
            .start();
    }
}
let UIMgr = new __UIMgr();
export default UIMgr;