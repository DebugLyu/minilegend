import PlayerMod from "../role/PlayerMod";

export default class PlayerMgr {
	// 单例
	private static _instance: PlayerMgr = null;
	public static getInstance(): PlayerMgr {
		if (this._instance == null) {
			this._instance = new PlayerMgr();
		}
		return this._instance;
	}


	// 玩家数据列表
	private _player_list: {[key:number]: PlayerMod} = {};
	// 玩家id列表对应 数据列表
	private _player_pid_list: {[key:number]: number} = {};

	addPlayer(player: PlayerMod){
		this._player_list[player.onlyid] = player;
		this._player_pid_list[player.playerid] = player.onlyid;
	}

	getPlayerByOnlyId(onlyid:number): PlayerMod {
		return this._player_list[onlyid];
	}

	getPlayerByPlayerId(pid: number): PlayerMod {
		let onlyid = this._player_pid_list[pid];
		if(onlyid != null){
			return this._player_list[onlyid];
		}
		return null;
	}

	delPlayer(pid: number){
		if(this._player_list[pid]){
			delete this._player_list[pid];
		}
	}
}