import WarriorMod from "./WarriorMod";
import MonsterCtr from "./MonsterCtr";
import { LivingType } from "../common/G";
import { MonsterData } from "../manager/MonsterMgr";

export default class MonsterMod extends WarriorMod {
	data: MonsterData = null;

	get control(): MonsterCtr {
		return <MonsterCtr>this._control;
	}

	init(){
        super.init();
        this.livingType = LivingType.MONSTER;
	}
	
	setMonData(mondata:MonsterData){
		this.data = mondata;
		this.control.resId = this.data.resid;
	}

	montest(){
		// this.control.testCtr();
	}
}
