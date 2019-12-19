import MonsterMod from "./MonsterMod";
import WarriorCtr from "./WarriorCtr";
import WarriorMod from "./WarriorMod";
import { MonsterData } from "../manager/MonsterMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/MonsterCtr")
export default class MonsterCtr extends WarriorCtr {
    
    data:MonsterData = null;

    onLoad(){
        this.setModel(new MonsterMod(this));
        super.onLoad();
    }

    start(){
        
    }
    
    init(data?: MonsterData){
        if(data){
            this.data = data;
            this.resId = data.resid;    
        }
    }

    testCtr(){
        console.log("test monster control");
        
    }
}