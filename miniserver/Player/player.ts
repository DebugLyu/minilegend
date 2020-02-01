import { Attribute, AttrIds } from "../common/G";
import equip from "./item/equip/equip";
import item from "./item/item";

export default class player {
	[x:string]: any;
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
	level: number = 0;
	// 经验
	exp: number = 0;

	// 当前装备
	equips: equip[] = [];
	// 背包物品
	items: item[] = [];
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

	test() {

	}

	toString(){
		return JSON.stringify(this);
	}

	fromJson(json: any){
		for (const key in json) {
			this[key] = json[key];
		}
	}

	static toObj(jsonstr: string){
		let newplayer = new player();
		let json = JSON.parse(jsonstr);
		newplayer.fromJson(json);
		return newplayer;
	}
}