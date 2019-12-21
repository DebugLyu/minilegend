const { ccclass, property } = cc._decorator;

@ccclass
export default class EffectLayer extends cc.Component {

    @property(cc.Node)
    hitNum: cc.Node = null;

    start() {

    }

    showHitNum(num: number, x: number | cc.Vec2, y?: number) {
        let labelnode = cc.instantiate(this.hitNum);
        labelnode.active = true;
        labelnode.parent = this.node;
        let label = labelnode.getComponent(cc.Label);
        label.string = "-" + num;

        if (typeof x == "number") {
            labelnode.x = x;
            labelnode.y = y + 50;
        } else {
            labelnode.position = x.add(cc.v2(0 , 50));
        }
        labelnode.scale = 2;

        labelnode.runAction(cc.sequence(cc.moveBy(0.8, 0, 120), cc.removeSelf(true)));
        labelnode.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(0.2), cc.fadeOut(0.4)));
    }

    // update (dt) {}
}
