import PlayerMod from "../role/PlayerMod";
import Role from "../role/Role";

export default class PlayerMgr {
	// 单例
	private static _instance: PlayerMgr = null;
	public static get instance(): PlayerMgr {
		if (this._instance == null) {
			this._instance = new PlayerMgr();
		}
		return this._instance;
	}


	// 玩家数据列表
	private playerList:{[key:number]: PlayerMod} = {};
	// 玩家id列表对应 数据列表
	private playerPidList:{[key:number]:number} = {};
	// main role ctr
	public mainRole: Role = null;

	addPlayer(player: PlayerMod) {
		this.playerList[player.onlyid] = player;
		this.playerPidList[player.playerid] = player.onlyid;
	}

	getPlayerByOnlyId(onlyid: number): PlayerMod {
		return this.playerList[onlyid];
	}

	getPlayerByPlayerId(pid: number): PlayerMod {
		let onlyid = this.playerPidList[pid];
		if (onlyid != null) {
			return this.playerList[onlyid];
		}
		return null;
	}

	delPlayer(pid: number) {
		if (this.playerList[pid]) {
			delete this.playerList[pid];
		}
	}

	isMainRole(onlyid: number): boolean {
		return onlyid == this.mainRole.model.onlyid;
	}
}