
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    controlNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private _touchEnable: boolean = false;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchBegan(event) {
        this._touchEnable = true;
        event
    }

    touchMove(event) {
        if(!this._touchEnable){
            return;
        }

    }

    touchEnd(event) {
        this._touchEnable = false;
    }

    // update (dt) {}
}
