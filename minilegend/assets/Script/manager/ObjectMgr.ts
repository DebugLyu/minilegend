import LivingMod from "../role/LivingMod";


export default class ObjectMgr {
	private static _instance: ObjectMgr = null;

	private objectList = new Map<number, LivingMod>();
	public static get instance(): ObjectMgr {
		if (this._instance == null) {
			this._instance = new ObjectMgr();
		}
		return this._instance;
	}

	addObject(obj: LivingMod): LivingMod {
		// this._object_list[obj]
		this.objectList[obj.onlyid] = obj;
		return obj;
	}

	delObject(obj: number | LivingMod){
		if(typeof obj == "number"){
			if(this.objectList[obj]){
				delete this.objectList[obj];
			}
		}else{
			let onlyid = obj.onlyid;
			if (this.objectList[onlyid]) {
				delete this.objectList[onlyid];
			}
		}
	}

	getObject(onlyid: number): LivingMod {
		return this.objectList[onlyid];
	}
}