import { ActState } from "../common/G";
import WarriorCtr from "./WarriorCtr";
import WarriorMod from "./WarriorMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/Role")

export default class Role extends cc.Component {
	
	@property(WarriorCtr)
	role: WarriorCtr<WarriorMod> = null;

    update(dt) {
        if (this.role.state == ActState.IDLE) {
            return;
        }

        let len = this.role.getModel().speed * dt;
        let xie = 0.75;
        let x = 0, y = 0;
        if (this.role.lastDir == 1) {
            x = y = -xie;
        } else if (this.role.lastDir == 2) {
            x = 0; y = -1;
        } else if (this.role.lastDir == 3) {
            x = xie; y = -xie;
        } else if (this.role.lastDir == 4) {
            x = -1; y = 0;
        } else if (this.role.lastDir == 6) {
            x = 1; y = 0;
        } else if (this.role.lastDir == 7) {
            x = -xie; y = xie;
        } else if (this.role.lastDir == 8) {
            x = 0; y = 1;
        } else if (this.role.lastDir == 9) {
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
}