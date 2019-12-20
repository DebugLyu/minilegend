import MonsterMod from "./MonsterMod";
import WarriorCtr from "./WarriorCtr";
import WarriorMod from "./WarriorMod";
import { MonsterData } from "../manager/MonsterMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/MonsterCtr")
export default class MonsterCtr extends WarriorCtr {
    model = new MonsterMod(this);
    
    start() {

    }


    testCtr() {
        console.log("test monster control");
    }
}