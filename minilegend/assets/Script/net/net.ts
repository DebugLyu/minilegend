import storge from "../common/Storge";
import { genUUID } from "../common/gFunc";
import { http } from "./http";
import playerMgr from "../manager/PlayerMgr";
import GameSceneMgr from "../manager/GameSceneMgr";
import UIMgr from "../manager/UIMgr";

export namespace Net {
	export async function login(){
		let uuid = storge.get("uuid");
        if(uuid == null){
            uuid = genUUID();
            storge.set("uuid", uuid);
        }
		let res = await http.get("/login", {uuid: uuid});
		if(res == null){
		    // UIMgr.msgBox(0, { 
			// 	msg: "网络连接失败！请检查网络设置", 
			// 	timeout: 3,
			// 	ok: async () => {
			// 		await login();
			// 	}
			// });
			UIMgr.notice("网络连接失败，正在重连");
			setTimeout(() => {
				login();
			}, 3 * 1000);
			return;
		}
        // 登陆到主界面
		console.log(res);
		playerMgr.mainData = res;
		// pmod.setData(res);
		GameSceneMgr.ChangeScene("Main");
	}
}