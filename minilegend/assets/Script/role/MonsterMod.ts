import WarriorMod from "./WarriorMod";
import MonsterCtr from "./MonsterCtr";

export default class MonsterMod extends WarriorMod {
	
	get control(): MonsterCtr {
		return <MonsterCtr>this._control;
	}

	montest(){
		this.control.testCtr();
	}
}
