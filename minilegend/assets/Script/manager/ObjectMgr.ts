import LivingCtr from "../role/LivingCtr";

export default class ObjectMgr {
	private static _instance: ObjectMgr = null;
	
	private _object_list:object = {};
	public static getInstance(): ObjectMgr {
		if(this._instance == null){
			this._instance = new ObjectMgr();
		}
		return this._instance;
	}

	addObject (obj:LivingCtr): LivingCtr{
		// this._object_list[obj]
		
		return obj;
	}

	delObject
}