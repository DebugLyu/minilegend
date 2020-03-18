import { redisdb } from "../util/redisdb";
import { mysqldb } from "../util/mysqldb";
import Token from "../util/token";
import Player from "../app/player/Player";

let player_seed = 10000;

class PlayerMgr {
	async getPlayer(uuid: string, update:boolean = false): Promise<Player | null> {
		let pstr = await redisdb.getHash("players", uuid);
		let p: Player | null = null;
		if (pstr == null) {
			let t = await mysqldb.getPlayer(uuid);
			if (t == null) {
				// 未注册角色
				p = new Player();
				p.init(uuid);
			} else {
				// mysql中存在
				p = Player.toObj(t.pinfo);
			}
			update = true;
		} else {
			//redis 中存在
			p = Player.toObj(pstr);
		}
		if(p == null){
			return null;
		}
		if(update){
			p.onlyid = player_seed++;
			let token = Token.getToken(uuid);
			p.token = token;
			p.update();
		}
		return p;
	}
}

let playerMgr = new PlayerMgr();
export default playerMgr;