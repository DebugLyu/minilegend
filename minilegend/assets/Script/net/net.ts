import storge from "../common/Storge";
import { genUUID } from "../common/gFunc";
import { http } from "./http";
import playerMgr from "../manager/PlayerMgr";
import GameSceneMgr from "../manager/GameSceneMgr";
import UIMgr from "../manager/UIMgr";

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
			http.get("/createItem").then(res => {

			});
		}

		export function createEquip() {
			http.get("/createEquip").then(res => {

			});
		}
	}
}