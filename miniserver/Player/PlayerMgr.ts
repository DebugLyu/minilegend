import player from "./player";
import { redis } from "../util/redisdb";
import { mysqldb } from "../util/mysqldb";
import Token from "../util/token";

let player_seed = 10000;

class PlayerMgr {
	async getPlayer(uuid: string): Promise<player> {
		let pstr = await redis.getHash("players", uuid);
		let p: player | null = null;
		if (pstr == null) {
			let t = await mysqldb.getPlayer(uuid);
			if (t == null) {
				// 未注册角色
				p = new player();
				p.init(uuid);
				redis.setHash("players", uuid, p.toString());
			} else {
				// mysql中存在
				p = player.toObj(t.pinfo);
			}
		} else {
			//redis 中存在
			p = player.toObj(pstr);
		}
		p.onlyid = player_seed++;
		let token = Token.getToken(uuid);
		p.token = token;
		return p;
	}
}

let playerMgr = new PlayerMgr();
export default playerMgr;