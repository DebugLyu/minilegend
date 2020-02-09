import { degree2Dir } from "../common/gFunc";
import PlayerCtr from "../role/playerCtr";
import Role from "../role/Role";
import PlayerMgr from "../manager/PlayerMgr";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/playerControl")
export default class PlayerControl extends cc.Component {
    role: Role = null;

    @property(cc.Node)
    controlNode: cc.Node = null;

    controlSpr: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private touchEnable: boolean = false;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);

        this.controlSpr = cc.find('spr', this.controlNode);
        cc.game.on("MainRole", this.setMainRole, this);
    }

    setMainRole(role:Role){
        this.role = role;
    }

    touchBegan(event) {
        if(this.role == null){
            return;
        }
        this.touchEnable = true;
        let beganPos = event.getLocation();
        let drawPos = this.node.convertToNodeSpaceAR(beganPos);
        this.controlNode.setPosition(drawPos);
    }

    touchMove(event) {
        if (!this.touchEnable) {
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
        this.controlSpr.setPosition(drawPos);
        let angle = drawPos.signAngle(cc.v2(1, 0));
        let degree = angle / Math.PI * 180;
        if(degree < 0){
            degree = 360 + degree;
        }
        degree = 360 - degree;

        if(!this.role.model.isDead && this.role.warrior.state == ActState.IDLE || this.role.warrior.state == ActState.RUN){
            this.role.unDoAnyThingTimer = 0;
            this.role.warrior.move(degree2Dir(degree));
        }
    }

    touchEnd(event) {
        this.touchEnable = false;
        this.controlNode.setPosition(0, 0);
        this.controlSpr.setPosition(0, 0);

        if(this.role.warrior.state == ActState.RUN){
            this.role.warrior.idle();
        }
    }

    // update (dt) {}
}
