import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr extends LivingCtr {
    
    
    move(dir: number){
        this.runAction(dir, "run");
    }

    dead(){

    }

    getModel():WarriorMod<this>{
        return this._model;
    }

}