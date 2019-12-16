export default class ObjectMgr {
	private static _instance: ObjectMgr = null;
	
	public static getInstance(): ObjectMgr {
		if(this._instance == null){
			this._instance = new ObjectMgr();
		}
		return this._instance;
	}
}