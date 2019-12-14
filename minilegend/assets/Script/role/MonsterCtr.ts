import MonsterMod from "./MonsterMod";
import WarriorCtr from "./WarriorCtr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/MonsterCtr")
export default class MonsterCtr extends WarriorCtr {
    
    start(){
        this.setModel(new MonsterMod(this));
    }
}