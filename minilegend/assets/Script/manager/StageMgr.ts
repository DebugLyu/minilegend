export default class StageMgr {
	public static instance: StageMgr = null
	public static getInstance():StageMgr{
		if(this.instance == null){
			this.instance = new StageMgr();

		}
		return this.instance;
	}


	private cur_stage_id:number = 0;
	private stage_data: JSON = {};
}