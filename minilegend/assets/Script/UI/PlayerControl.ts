import PlayerCtr from "../role/playerCtr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property(PlayerCtr)
    player: PlayerCtr = null;

    @property(cc.Node)
    controlNode: cc.Node = null;

    _controlSpr: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private _touchEnable: boolean = false;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);

        this._controlSpr = cc.find('spr', this.controlNode);
    }

    touchBegan(event) {
        this._touchEnable = true;
        let beganPos = event.getLocation();
        let drawPos = this.node.convertToNodeSpaceAR(beganPos);
        this.controlNode.setPosition(drawPos);
    }

    touchMove(event) {
        if (!this._touchEnable) {
            return;
        }
        let beganPos = event.getLocation();
        let drawPos: cc.Vec2 = this.controlNode.convertToNodeSpaceAR(beganPos);
        let c = this.controlNode.position;
        let r = 100;
        let len = drawPos.mag();

        if (len > r) {
            drawPos.x = r * drawPos.x / len;
            drawPos.y = r * drawPos.y / len;
        }
        this._controlSpr.setPosition(drawPos);
        let angle = drawPos.signAngle(cc.v2(1, 0));
        let degree = angle / Math.PI * 180;
        let dir = 2;
        if (degree >= -22.5 && degree < 22.5) {
            dir = 6;
        } else if (degree >= 22.5 && degree < 67.5) {
            dir = 3;
        } else if (degree >= 67.5 && degree < 112.5) {
            dir = 2;
        } else if (degree >= 112.5 && degree < 157.5) {
            dir = 1;
        } else if (degree >= 157.5 && degree <= 180 || degree > -180 && degree < -157.5) {
            dir = 4;
        } else if (degree > -157.5 && degree < -112.5) {
            dir = 7;
        } else if (degree > -112.5 && degree < -67.5) {
            dir = 8;
        } else if (degree > -67.5 && degree < -22.5) {
            dir = 9;
        }
        this.player.move(dir);
    }

    touchEnd(event) {
        this._touchEnable = false;
        this.controlNode.setPosition(0, 0);
        this._controlSpr.setPosition(0, 0);
        this.player.idle();
    }

    // update (dt) {}
}
