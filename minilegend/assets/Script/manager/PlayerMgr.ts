import PlayerMod from "../role/PlayerMod";
import Role from "../role/Role";
import PlayerData from "../app/role/PlayerData";

class PlayerMgr {
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
	}

	private _mainData: PlayerData = new PlayerData();
	public get mainData():PlayerData {
		return this._mainData;
	}
	public set mainData(data: PlayerData){
		this._mainData = data;
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

let playerMgr = new PlayerMgr();
export default playerMgr;