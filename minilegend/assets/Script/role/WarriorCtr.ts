import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr<T extends WarriorMod> extends LivingCtr<T> {



    move(dir: number) {
        this.runAction(dir, ActState.RUN);
    }

    update(dt) {
        if (this.state == ActState.IDLE) {
            return;
        }

        let len = this._model.speed * dt;
        let xie = 0.75;
        let x = 0, y = 0;
        if (this._lastDir == 1) {
            x = y = -xie;
        } else if (this._lastDir == 2) {
            x = 0; y = -1;
        } else if (this._lastDir == 3) {
            x = xie; y = -xie;
        } else if (this._lastDir == 4) {
            x = -1; y = 0;
        } else if (this._lastDir == 6) {
            x = 1; y = 0;
        } else if (this._lastDir == 7) {
            x = -xie; y = xie;
        } else if (this._lastDir == 8) {
            x = 0; y = 1;
        } else if (this._lastDir == 9) {
            x = xie; y = xie;
        }
        let pos = this.node.position.add(cc.v2(x * len, y * len));
        

        if(pos.x < 0){
            pos.x = 0;
        }
        if(pos.x > this.node.parent.width){
            pos.x = this.node.parent.width;
        }
        if(pos.y < 0){
            pos.y = 0;
        }
        if(pos.y > this.node.parent.height){
            pos.y = this.node.parent.height;
        }

        this.node.setPosition(pos);
    }

    dead() {

    }
}