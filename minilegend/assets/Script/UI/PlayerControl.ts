import { degree2Dir } from "../common/gFunc";
import PlayerCtr from "../role/playerCtr";
import Role from "../role/Role";
import PlayerMgr from "../manager/PlayerMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/playerControl")
export default class PlayerControl extends cc.Component {
    role: Role = null;

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
        this.role = PlayerMgr.instance.mainRole;
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
        // let c = this.controlNode.position;
        let r = 100;
        let len = drawPos.mag();

        if (len > r) {
            drawPos.x = r * drawPos.x / len;
            drawPos.y = r * drawPos.y / len;
        }
        this._controlSpr.setPosition(drawPos);
        let angle = drawPos.signAngle(cc.v2(1, 0));
        let degree = angle / Math.PI * 180;
        this.role.getWarrior().move(degree2Dir(degree));
    }

    touchEnd(event) {
        this._touchEnable = false;
        this.controlNode.setPosition(0, 0);
        this._controlSpr.setPosition(0, 0);
        this.role.getWarrior().idle();
    }

    // update (dt) {}
}
