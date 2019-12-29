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
	private _mainRole: Role = null;
	
	public get mainRole() : Role {
		return this._mainRole;
	}
	public set mainRole(v : Role) {
		this._mainRole = v;
		cc.game.emit("MainRole", v);
	}
	

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

	delPlayer(onlyid: number) {
		if (this.playerList[onlyid]) {
			delete this.playerList[onlyid];
		}
	}

	isMainRole(onlyid: number): boolean {
		return onlyid == this.mainRole.model.onlyid;
	}
}