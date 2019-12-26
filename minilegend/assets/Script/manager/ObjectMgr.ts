import LivingMod from "../role/LivingMod";
import Role from "../role/Role";


export default class ObjectMgr {
	private static _instance: ObjectMgr = null;

	public objectList: {[key:number]: Role} = {};
	public static get instance(): ObjectMgr {
		if (this._instance == null) {
			this._instance = new ObjectMgr();
		}
		return this._instance;
	}

	addObject(obj: Role): Role {
		// this._object_list[obj]
		this.objectList[obj.warrior.model.onlyid] = obj;
		return obj;
	}

	delObject(obj: number | Role){
		if(typeof obj == "number"){
			if(this.objectList[obj]){
				delete this.objectList[obj];
			}
		}else{
			let onlyid = obj.model.onlyid;
			if (this.objectList[onlyid]) {
				delete this.objectList[onlyid];
			}
		}
	}

	getObject(onlyid: number): Role {
		return this.objectList[onlyid];
	}
}