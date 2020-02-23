import storge from "../common/Storge";
import { genUUID } from "../common/gFunc";
import { http } from "./http";
import playerMgr from "../manager/PlayerMgr";
import GameSceneMgr from "../manager/GameSceneMgr";
import UIMgr from "../manager/UIMgr";
import Llog from "../common/LLog";
import LEvent from "../common/EventListner";

function checkRes(res){
	if (res == null) {
		UIMgr.notice("网络连接失败，正在重连");
		setTimeout(Net.login, 3 * 1000);
		return false;
	}
	return true;
}

interface LoginData {
	uuid: string
}

function loginBack(res) {
	// 登陆到主界面
	Llog.log(res);
	playerMgr.mainData.fromJson(res);
	GameSceneMgr.ChangeScene("Main");
}


interface EquipOn {
	onlyid: string;
}
function equipOnBack(res){
	playerMgr.mainData.itemFromJson(res.items);
	playerMgr.mainData.equipFromJson(res.equips);
	UIMgr.hideUI();
	LEvent.emit("ItemUpdate");
	LEvent.emit("EquipUpdate");
}

interface StartTaskData {
	taskid: number;
}
function StartTaskBack(res) {
	
}





//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
function send(key, params, callback){
	http.get("/" + key, params).then(res => {
		if(!checkRes(res)){
			return;
		}
		callback(res);
	});
}

export namespace Net {
	export function login(){
		// 未登陆过
		let onlyid = playerMgr.mainData.onlyid;
		if(onlyid == 0){
			let uuid = storge.get("uuid");
			if (uuid == null) {
				uuid = genUUID();
				storge.set("uuid", uuid);
			}
			send("login", { uuid: uuid }, loginBack);
		}else{
			// 重连不需要添加uuid
			send("login", {}, loginBack);
		}
	}

	export function equipOn(data: EquipOn){
		send("EquipOn", data, equipOnBack);
	}

	export function startTask(data: StartTaskData){
		send("StartTask", data, StartTaskBack);
	}

	export namespace gm {
		export function createItem(itemid: number, num: number) {
			http.get("/createItem", {
				itemid: itemid,
				num: num,
			}).then(res => {
				playerMgr.mainData.itemFromJson(res);
				LEvent.emit("ItemUpdate");
			});
		}
	}
}