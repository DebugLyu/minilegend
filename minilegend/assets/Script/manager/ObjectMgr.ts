import LivingMod from "../role/LivingMod";


export default class ObjectMgr {
	private static instance: ObjectMgr = null;

	private objectList = new Map<number, LivingMod>();
	public static getInstance(): ObjectMgr {
		if (this.instance == null) {
			this.instance = new ObjectMgr();
		}
		return this.instance;
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