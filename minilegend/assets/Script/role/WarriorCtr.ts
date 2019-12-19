import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr extends LivingCtr {

    get model(): WarriorMod {
        return <WarriorMod>this._model;
    }

    move(dir: number) {
        this.runAction(dir, ActState.RUN);
    }

    dead() {

    }
}