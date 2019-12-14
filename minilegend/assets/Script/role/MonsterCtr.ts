import LivingCtr from "./LivingCtr";
import MonsterMod from "./MonsterMod";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterCtr extends LivingCtr {
    
    start(){
        this.setModel(new MonsterMod(this));
    }
}