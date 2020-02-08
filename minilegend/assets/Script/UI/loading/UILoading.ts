import gameMgr from "../../manager/GameMgr";
import { Net } from "../../net/net";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/loading")
export default class UILoading extends cc.Component {
    inited: boolean = false;

    @property(cc.ProgressBar)
    loadingBar: cc.ProgressBar = null;

    onEnable() {
        gameMgr.regGameStart(() => {
            Net.login();
        });
        gameMgr.init();
    }

    start() {

    }

    update(dt) {
        if (!this.loadingBar) {
            return;
        }

        if(this.loadingBar.progress < 0.95){
            this.loadingBar.progress += 0.01;
        }
    }

}