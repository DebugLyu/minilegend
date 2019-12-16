class StageData {
	stageid: number = 0;
}

export default class StageMgr {
	private static _instance: StageMgr = null
	public static getInstance(): StageMgr {
		if (this._instance == null) {
			this._instance = new StageMgr();

		}
		return this._instance;
	}


	private _cur_stage_id: number = 0;
	private _stage_data: {[index: number]: StageData} = {};
	init() {
		
	}
	
	getStageData(stageid: number): StageData {
		return this._stage_data[stageid];
	}
}