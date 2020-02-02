import gameMgr from "../../manager/GameMgr";
import { http } from "../../net/http";
import storge from "../../common/Storge";
import { genUUID, safeJson } from "../../common/gFunc";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/loading")
export default class UILoading extends cc.Component {
    inited: boolean = false;

    @property(cc.ProgressBar)
    loadingBar: cc.ProgressBar = null;

    onEnable() {
        gameMgr.init();
    }

    start() {

    }

    update(dt) {
        if (!this.loadingBar) {
            return;
        }
        if (!this.inited && gameMgr.config) {
            this.login();
            this.inited = true;
        }
        if(this.loadingBar.progress < 0.95){
            this.loadingBar.progress += 0.01;
        }
    }

    async login(){
        let uuid = storge.get("uuid");
        if(uuid == null){
            uuid = genUUID();
            storge.set("uuid", uuid);
        }
        let res = await http.get("/login", {uuid: uuid});
        // 登陆到主界面
        let pinfo = safeJson(res.pinfo);
        console.log(pinfo);
        
    }
}