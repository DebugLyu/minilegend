import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr<T extends WarriorMod> extends LivingCtr<T> {
    
    
    move(dir: number){
        this.runAction(dir, "run");
    }

    dead(){

    }
}