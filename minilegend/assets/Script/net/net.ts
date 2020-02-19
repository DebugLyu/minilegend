import storge from "../common/Storge";
import { genUUID } from "../common/gFunc";
import { http } from "./http";
import playerMgr from "../manager/PlayerMgr";
import GameSceneMgr from "../manager/GameSceneMgr";
import UIMgr from "../manager/UIMgr";
import Llog from "../common/LLog";
import LEvent from "../common/EventListner";

export namespace Net {
	export function login(){
		let uuid = storge.get("uuid");
        if(uuid == null){
            uuid = genUUID();
            storge.set("uuid", uuid);
        }
		http.get("/login", {uuid: uuid}).then(res => {
			if (res == null) {
				UIMgr.notice("网络连接失败，正在重连");
				setTimeout(login, 3 * 1000);
				return;
			}
			// 登陆到主界面
			console.log(res);
			playerMgr.mainData = res;
			GameSceneMgr.ChangeScene("Main");
		});
	}



	export namespace gm {
		export function createItem() {
			http.get("/createItem", {
				uuid: playerMgr.mainData.uuid,
				token: playerMgr.mainData.token,
				// itemid: 
			}).then(res => {

			});
		}

		export function createEquip() {
			http.get("/createEquip", {
				uuid: playerMgr.mainData.uuid,
				token: playerMgr.mainData.token,
				itemid: 30001,
				num: 1,
			}).then(res => {
				// Llog.info(res);
				playerMgr.mainData.items = res;
				LEvent.emit("ItemUpdate");
			});
		}
	}
}