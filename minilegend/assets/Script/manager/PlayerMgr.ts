export default class PlayerMgr {
	private static _instance: PlayerMgr = null;

	public static getInstance(): PlayerMgr {
		if (this._instance == null) {
			this._instance = new PlayerMgr();
		}
		return this._instance;
	}
}