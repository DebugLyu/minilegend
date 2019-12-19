cc.Class({
    extends: cc.Component,
    properties: {
       controlBall: cc.Node,
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnded.bind(this));
        this.angle = 0;
        this.onTouch = false;
    },

    touchBegan(event) {
        let beganPos = this.node.convertToNodeSpace(event.getLocation());
        if(this.controlBall.getBoundingBox().contains(beganPos))
        this.onTouch = true;
    },

    touchMoved(event) {
        if (!this.onTouch) {
            return;
        }
        // let nextPos = cc.pAdd(this.controlBall.getLocation() + event.getDelta());
        let nextPos = this.controlBall.getLocation().add(event.getDelta());
        let distance = nextPos.sub(cc.v2(0, 0)).mag();
        if (distance > 100) {
            return;
        }
        this.controlBall.setPosition(nextPos);
     
    },
    touchEnded(event) {
        this.onTouch = false;
        this.angle = 0;
        this.controlBall.setPosition(cc.v2(0, 0));
    },

    getAngle(){

    },
    
    start() {
    },
});
