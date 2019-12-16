
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

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

    getRad(pos1, pos2) {
        var px1 = pos1.x;
        var py1 = pos1.y;
        var px2 = pos2.x;
        var py2 = pos2.y;

        //得到两点x的距离
        var x = px2 - px1;
        //得到两点y的距离
        var y = py1 - py2;
        //算出斜边长度
        var xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        //得到这个角度的余弦值(通过三角函数中的店里：角度余弦值=斜边/斜边)
        var cosAngle = x / xie;
        //通过反余弦定理获取到期角度的弧度
        var rad = Math.acos(cosAngle);
        //注意：当触屏的位置Y坐标<摇杆的Y坐标，我们要去反值-0~-180
        if (py2 < py1) {
            rad = -rad;
        }
        return rad;
    }

    touchMove(event) {
        if (!this._touchEnable) {
            return;
        }
        let beganPos = event.getLocation();
        let drawPos = this.controlNode.convertToNodeSpaceAR(beganPos);
        let c = this.controlNode.position;
        let r = 100;
        var dx = drawPos.x - c.x;
        var dy = drawPos.y - c.y;
        if (dx * dx + dy * dy <= r * r) {
            this._controlSpr.setPosition(drawPos);
        }

        //计算两个圆心之间距离
        var juli = Math.sqrt(Math.pow((c.x - drawPos.x), 2) + Math.pow((c.y - drawPos.y), 2));
        //距离不超过半径
        if (juli >= r) {
            cc.log("go111>>>");
            // this._controlSpr.setPosition(drawPos);
            var p_rad = this.getRad(c, drawPos);
            let p2 = cc.v2(r * Math.cos(p_rad), r * Math.sin(p_rad));
            this._controlSpr.setPosition(p2.add(cc.v2(c.x, c.y)));
        }
        else {
            cc.log("go2222>>>");
            this._controlSpr.setPosition(drawPos);
        }

    }

    touchEnd(event) {
        this._touchEnable = false;
        this.controlNode.setPosition(0, 0);
        this._controlSpr.setPosition(0, 0);
    }

    // update (dt) {}
}
