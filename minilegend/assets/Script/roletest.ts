const { ccclass, property } = cc._decorator;

import { getAnimation } from "./common/gFunc";
import { ActState } from "./common/G";

@ccclass
export default class roletest extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;

    start() {
        this.runAction();
    }

    async runAction() {
        let dir = 2;
        let curClip = await getAnimation("role", 3800, ActState.IDLE, dir);
        let addonani = this.roleNode.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }
    // update (dt) {}
}
