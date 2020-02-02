import player from "./player";
import { redis } from "../util/redisdb";
import { mysqldb } from "../util/mysqldb";
import Token from "../util/token";

class PlayerMgr {
	async getPlayer(uuid: string): Promise<player> {
		let pstr = await redis.getHash("players", uuid);
		if (pstr == null) {
			let t = await mysqldb.getPlayer(uuid);
			if (t == null) {
				// 未注册角色
				let p = new player();
				let token = Token.getToken(uuid);
				p.init(uuid, token);
				return p;
			} else {
				// mysql中存在
				let p = player.toObj(t.pinfo);
				return p;
			}
		} else {
			//redis 中存在
			let p = player.toObj(pstr);
			return p;
		}
	}
}

let playerMgr = new PlayerMgr();
export default playerMgr;