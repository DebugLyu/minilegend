import LivingMod from "../app/role/LivingMod";
import Role from "../app/role/Role";


class ObjectMgr {
	
	public objectList: {[key:number]: Role} = {};


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
let objMgr = new ObjectMgr();
export default objMgr;