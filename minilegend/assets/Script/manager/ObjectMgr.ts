import LivingMod from "../role/LivingMod";


export default class ObjectMgr {
	private static _instance: ObjectMgr = null;

	private _object_list: { [key: number]: LivingMod } = {};
	public static getInstance(): ObjectMgr {
		if (this._instance == null) {
			this._instance = new ObjectMgr();
		}
		return this._instance;
	}

	addObject(obj: LivingMod): LivingMod {
		// this._object_list[obj]
		this._object_list[obj.onlyid] = obj;
		return obj;
	}

	delObject(obj: number | LivingMod){
		if(typeof obj == "number"){
			if(this._object_list[obj]){
				delete this._object_list[obj];
			}
		}else{
			let onlyid = obj.onlyid;
			if (this._object_list[onlyid]) {
				delete this._object_list[onlyid];
			}
		}
	}

	getObject(onlyid: number): LivingMod {
		return this._object_list[onlyid];
	}
}