import MonsterMod from "./MonsterMod";
import WarriorCtr from "./WarriorCtr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterCtr extends WarriorCtr {
    
    start(){
        this.setModel(new MonsterMod(this));
    }
}