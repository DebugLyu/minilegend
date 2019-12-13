import { roleAnimation } from "../common/gFunc";
import PlayerMod from "./PlayerMod";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtr extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;
    
    private resId: number = 0;
    private model: PlayerMod = new PlayerMod(this);

    start() {
        this.runAction();
    }

    async runAction(dir:number = 2, act: string = "idle") {
        let curClip = await roleAnimation(3800, act, dir);
        let addonani = this.roleNode.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }
    // update (dt) {}

    setResId(resid:number){
        this.resId = resid;
    }

    getResId() : number{
        return this.resId;
    }
}
