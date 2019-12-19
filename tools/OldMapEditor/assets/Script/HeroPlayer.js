cc.Class({
    extends: cc.Component,
    properties: {
    },

    onLoad() {
        this.movePosArr = [];
        this.gridWidth = 25;
        this.gridHeight = 20;
        this.canvasWidht = 1280;
        this.canvasHeight = 720;
        this.schedule(this.heroMove, 0.1, cc.macro.REPEAT_FOREVER, 0.1);
    },

    heroMove(){
        if (this.movePosArr.length > 0) {
            let movePos = this.movePosArr[0];
            this.movePosArr = this.movePosArr.slice(1);
            let realPos = cc.v2(-this.canvasWidht/2 + this.gridWidth/2 + movePos.l * this.gridWidth, -this.canvasHeight/2 + this.gridHeight/2 + movePos.r * this.gridHeight)
            this.node.runAction(cc.moveTo(0.1, realPos));
        }
    },

});
