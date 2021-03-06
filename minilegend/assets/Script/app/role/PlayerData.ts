import { ItemType, EquipPos } from "../../common/G";
import Equip from "../item/equip/Equip";
import Item from "../item/Item";
import LEvent from "../../common/EventListner";
import { safeJson } from "../../common/gFunc";
import Task from "../task/Task";
import Skill from "../skill/Skill";
import { Attribute } from "../attribute/attribute";

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
	// 名字 
	name: string = "";

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
	equips: { [x: number]: Equip } = {};
	// 背包物品
	items: Item[] = [];
	// 任务
	tasks: Task[] = [];

	// 技能列表
	skills: Skill[] = [];
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


	// 最后进入的关卡
	lastStage: number = 0;

	getWeaponResid(){
		let weapon = this.equips[EquipPos.Weapon];
		if(weapon){
			return weapon.equipData.outlook;
		}
		return 0;
	}

	getClothResid(){
		let clothes = this.equips[EquipPos.Clothes];
		if(clothes){
			return clothes.equipData.outlook;
		}
		return 0;
	}

	fromJson(json: any) {
		for (const key in json) {
			if (key == "items"){
				this.itemFromJson(json[key]);
				continue;
			}
			if (key == "equips") {
				this.equipFromJson(json[key]);
				continue;
			}
			if (key == "tasks") {
				this.taskFromJson(json[key]);
				continue;
			}
			if (key == "skills") {
				this.skillFromJson(json[key]);
				continue;
			}
			if (key == "attr") {
				this.attrFromJson(json[key]);
				continue;
			}
			this[key] = safeJson(json[key]);
		}
	}

	equipFromJson(json:any){
		this.equips = {};
		for (const datakey in json) {
			const data = json[datakey];
			let equip: Equip = new Equip();
			equip.fromJson(data);
			this.equips[equip.equipData.wear] = equip;
		}
	}

	itemFromJson(json: any){
		this.items = [];
		for (const datakey in json) {
			const data = json[datakey];
			let item: Item = null;
			if (data.type == ItemType.Equip) {
				item = new Equip();
			}
			if (item == null) {
				continue;
			}
			item.fromJson(data);
			this.items.push(item);
		}
	}

	taskFromJson(json: any) {
		this.tasks = [];
		for (const datakey in json) {
			const data = json[datakey];
			let task: Task = new Task();

			task.fromJson(data);
			this.tasks.push(task);
		}
	}

	skillFromJson(json: any) {
		this.skills = [];
		for (const datakey in json) {
			const data = json[datakey];
			let skill: Skill = new Skill();

			skill.fromJson(data);
			this.skills.push(skill);
		}
	}

	attrFromJson(json:any){
		this.attr.fromJson(json);
	}
}