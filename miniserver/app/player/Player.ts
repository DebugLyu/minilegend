import { ItemType, EquipPos, StartMapStage, DefSkill } from "../../common/G";
import Item from "../item/Item";
import { safeJson } from "../../common/gFunc";
import { ErrList } from "../../common/ErrorList";
import { redisdb } from "../../util/redisdb";
import Equip from "../item/equip/Equip";
import Task from "../task/Task";
import taskMgr from "../../manager/TaskMgr";
import Skill from "../skill/Skill";
import skillMgr from "../../manager/SkillMgr";
import attributeMgr from "../../manager/AttributeMgr";
import { Attribute } from "../attribute/attribute";
import equipMgr from '../../manager/EquipMgr';

export default class Player {
	// 绝对id 上线后分配的id
	onlyid: number = 0;

	// 玩家id 数据库id
	playerid: number = 0;

	// 账号
	account: string = "";

	// token 验证上下文
	token: string = "";

	// 客户端生成唯一id
	uuid: string = "";

	// 名字
	name: string = "";

	// 等级
	level: number = 1;

	// 经验
	exp: number = 0;

	// 体力
	power: number = 0;

	// 当前装备
	equips: { [x: number]: Equip } = {};

	// 背包物品
	items: Item[] = [];

	// 任务列表
	tasks: Task[] = [];

	// 技能列表
	skills: Skill[] = [];

	// 佩戴技能列表
	useSkills: number[] = [];

	// 元宝
	gold: number = 0;

	// 银币
	coin: number = 0;

	// 最高地图
	maxMap: number = 0;

	// 最大关卡
	maxStage: number = 0;

	// 属性
	attr: Attribute = new Attribute();

	constructor() {
		this.maxMap = StartMapStage.map;
		this.maxStage = StartMapStage.stage;
	}

	init(uuid: string, token?: string) {
		this.uuid = uuid;
		token && (this.token = token);

		this.maxMap = StartMapStage.map;
		this.maxStage = StartMapStage.stage;

		this.initTask();
		this.initSkill();

		this.calAttr();
	}

	// 设置了基础信息 之后调用
	initTask() {
		let taskList = taskMgr.getTaskDatasByMapId(this.maxMap);
		for (const taskdata of taskList) {
			let task = new Task();
			task.init(taskdata);
			this.tasks.push(task);
		}
	}

	initSkill() {
		if (this.skills == null) {
			this.skills = [];
			let skills = skillMgr.getAllSkills();
			for (const skillid in skills) {
				if (skills.hasOwnProperty(skillid)) {
					const skilldata = skills[skillid];
					let skill = new Skill();
					skill.level = 0;
					// 添加默认技能
					if (DefSkill.indexOf(Number(skillid)) != -1) {
						skill.level = 1;
					}
					skill.skillid = Number(skillid);
					this.skills.push(skill);
				}
			}
		}
	}

	getItemByOnlyId(onlyid: string): Item | null {
		for (const item of this.items) {
			if (item.onlyid == onlyid) {
				return item;
			}
		}
		return null;
	}

	getItemByItemId(itemid: number): Item | null {
		for (const item of this.items) {
			if (item.itemid == itemid) {
				return item;
			}
		}
		return null;
	}

	addItem(item: Item): number {
		if (item.type == ItemType.Equip) {
			this.items.push(item);
		} else {
			let curitem = this.getItemByItemId(item.itemid);
			if (curitem == null) {
				this.items.push(item);
			} else {
				curitem.num += item.num;
			}
		}
		return ErrList.SUCCESS;
	}

	delItem(onlyid: string) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.onlyid == onlyid) {
				this.items.splice(i, 1);
			}
		}
	}

	equipOn(onlyid: string) {
		let item = this.getItemByOnlyId(onlyid);
		if (!item) {
			return;
		}
		if (item.type != ItemType.Equip) {
			return;
		}
		let equip: Equip = item as Equip;
		let equipdata = equipMgr.getEquipData(equip.equipid);
		if (!equipdata) {
			return;
		}

		let pos = equipdata.wear;
		let curequip = this.equips[pos];
		if (curequip != null) {
			// 脱下 现有装备
			this.equipOff(pos);
		}
		this.equips[pos] = equip;
		this.delItem(equip.onlyid);
		// this.update();
		return ErrList.SUCCESS;
	}

	equipOff(equip: Equip): any;
	equipOff(equippos: EquipPos): any;
	equipOff(t: Equip | EquipPos): any {
		let equip: Equip | null = null;
		if (typeof t == "number") {
			equip = this.equips[t];
		} else {
			equip = t;
		}
		if (equip == null) {
			return;
		}

		let equipdata = equipMgr.getEquipData(equip.equipid);
		if (!equipdata) {
			return;
		}

		this.items.push(equip);
		delete this.equips[equipdata.wear];
	}

	// 通关了一个地图 
	onFinishMap(mapid: number) {
		// 需要更新任务
		this.maxMap = mapid;
		this.initTask();
	}

	calAttr() {
		let baseattr = attributeMgr.getRoleAttr(this.level);
		this.attr.setAttr(baseattr);
	}

	getAllAttr() {
		let attr = new Attribute();
		attr.add(this.attr);
		for (const key in this.equips) {
			const equip = this.equips[key];
			attr.add(equip.attr);
		}
		return attr;
	}

	enterStage(stageid: number): number | Attribute {
		if (stageid > this.maxStage) {
			return ErrList.Cannot_Enter_Stage;
		}

		return this.getAllAttr();
	}




















	fromJson(json: any) {
		Object.assign(this, json);

		for (const key in json) {
			if (key == "items") {
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
		}
	}

	itemFromJson(json: any) {
		this.items = [];
		for (const datakey in json) {
			const data = json[datakey];
			let item: Item | null = null;
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

	equipFromJson(json: any) {
		this.equips = {};
		for (const datakey in json) {
			const data = json[datakey];
			let equip: Equip = new Equip();

			equip.fromJson(data);
			let equipdata = equipMgr.getEquipData(equip.equipid);
			if (equipdata == null) {
				continue;
			}
			this.equips[equipdata.wear] = equip;
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

	toString() {
		return JSON.stringify(this);
	}

	static toObj(obj: string | object) {
		let newplayer = new Player();
		if (typeof obj == "string") {
			let newobj = safeJson(obj);
			if(newobj == null){
				return null;
			}
			obj = newobj;
		}
		newplayer.fromJson(obj);
		return newplayer;
	}
	// toString() {
	// 	const data: string = serialize(this);
	// 	// const zoo: Zoo = deserialize<Zoo>(json, Zoo);
	// 	return data;
	// }

	// static toObj(obj: string | object): Player | null {
	// 	if (typeof obj == "string") {
	// 		let jsonobj = safeJson(obj);
	// 		if(jsonobj == null  || typeof jsonobj == "string"){
	// 			return null;
	// 		}
	// 		obj = jsonobj;
	// 	}
	// 	const p: Player = deserialize<Player>(obj, Player);
	// 	return p;
	// }

	update() {
		redisdb.setHash("players", this.uuid, this.toString());
	}
}