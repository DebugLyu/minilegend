import { roleAnimation } from "../common/gFunc";
import PlayerMod from "./PlayerMod";
import LivingCtr from "./LivingCtr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtr extends LivingCtr {
    
    // private model: PlayerMod = new PlayerMod(this);

    start() {
        this.setModel(new PlayerMod(this));
        this.runAction();
    }

    async runAction(dir:number = 2, act: string = "idle") {
        let curClip = await roleAnimation(3800, act, dir);
        let addonani = this.roleNode.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }
    // update (dt) {}

    test(){
        this.model.weapon = 1;
    }
}
