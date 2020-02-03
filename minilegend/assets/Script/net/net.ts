import storge from "../common/Storge";
import { genUUID, safeJson } from "../common/gFunc";
import { http } from "./http";
import playerMgr from "../manager/PlayerMgr";
import PlayerMod from "../app/role/PlayerMod";
import GameSceneMgr from "../manager/GameSceneMgr";

export namespace Net {
	export async function login(){
		let uuid = storge.get("uuid");
        if(uuid == null){
            uuid = genUUID();
            storge.set("uuid", uuid);
        }
        let res = await http.get("/login", {uuid: uuid});
        // 登陆到主界面
		console.log(res);
		playerMgr.mainData = res;
		// pmod.setData(res);
		GameSceneMgr.ChangeScene("Main");
	}
}