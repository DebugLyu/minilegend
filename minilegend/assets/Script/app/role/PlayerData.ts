import { Attribute } from "../../common/G";
import Equip from "../item/equip/Equip";
import Item from "../item/Item";
import LEvent from "../../common/EventListner";
import { random } from "../../common/gFunc";

export default class PlayerData {
	// 绝对id 服务器专有 与 客户端 绝对id 不同。
	onlyid: number = 0;
	// 玩家id 数据库id
	playerid: number = 0;
	// 账号
	account: string = "";
	// token 验证上下文
	token: string = "";
	// uuid
	uuid: string = "";
	// 等级
	private _level: number = 0;
	get level() {
		return this._level;
	}
	set level(n: number) {
		this._level = n;
		LEvent.emit("RoleDataChange", "level", n);
	}

	// 经验
	private _exp: number = 0;
	get exp() {
		return this._exp;
	}
	set exp(n: number) {
		this._exp = n;
		LEvent.emit("RoleDataChange", "exp", n);
	}

	// 体力
	private _power: number = 0;
	get power (){
		return this._power
	}

	set power (n:number){
		this._power = n;
		LEvent.emit("RoleDataChange", "power", n);
	}

	// 当前装备
	equips: Equip[] = [];
	// 背包物品
	items: Item[] = [];
	// 元宝
	private _gold: number = 0;
	get gold() {
		return this._gold;
	}
	set gold(n: number){
		this._gold = n;
		LEvent.emit("RoleDataChange", "gold", n);
	}
	// 银币
	private _coin: number = 0;
	get coin() {
		return this._coin;
	}
	set coin(n: number) {
		this._coin = n;
		LEvent.emit("RoleDataChange", "coin", n);
	}

	// 最高地图
	maxMap: number = 0;
	// 最大关卡
	maxStage: number = 0;
	// 属性
	attr: Attribute = new Attribute();
}