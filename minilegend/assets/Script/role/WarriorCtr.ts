import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr extends LivingCtr {
    model:WarriorMod = new WarriorMod(this);

    move(dir: number) {
        this.runAction(dir, ActState.RUN);
    }

    dead() {
        this.runAction(2, ActState.DIE);
    }
}