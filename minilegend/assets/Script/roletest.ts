const { ccclass, property } = cc._decorator;

import {roleAnimation} from "./common/gFunc";

@ccclass
export default class roletest extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;

    start() {
        this.runAction();
    }

    async runAction() {
        let dir = 2;
        let act = "idle";
        let curClip = await roleAnimation(3800, act, dir);
        let addonani = this.roleNode.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }
    // update (dt) {}
}
