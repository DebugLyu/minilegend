import PlayerMod from "../role/PlayerMod";

export default class PlayerMgr {
	// 单例
	private static instance: PlayerMgr = null;
	public static getInstance(): PlayerMgr {
		if (this.instance == null) {
			this.instance = new PlayerMgr();
		}
		return this.instance;
	}


	// 玩家数据列表
	private playerList = new Map<number, PlayerMod>();// {[key:number]: PlayerMod} = {};
	// 玩家id列表对应 数据列表
	private playerPidList = new Map<number, number>();

	addPlayer(player: PlayerMod){
		this.playerList[player.onlyid] = player;
		this.playerPidList[player.playerid] = player.onlyid;
	}

	getPlayerByOnlyId(onlyid:number): PlayerMod {
		return this.playerList[onlyid];
	}

	getPlayerByPlayerId(pid: number): PlayerMod {
		let onlyid = this.playerPidList[pid];
		if(onlyid != null){
			return this.playerList[onlyid];
		}
		return null;
	}

	delPlayer(pid: number){
		if(this.playerList[pid]){
			delete this.playerList[pid];
		}
	}
}