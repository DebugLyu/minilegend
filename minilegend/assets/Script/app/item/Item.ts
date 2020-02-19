import { ItemType } from "../../common/G";
import { safeJson } from "../../common/gFunc";


export interface ItemData {
	id: number, // id	
	name: string, // 名字	
	type: number, // 类型（1元宝2银币3经验100消耗品101垃圾品102通用材料103药品材料104药品105装备材料106装备	
	kind: number, // 类型（装备填装备id	
	quality: number, // 品质（1垃圾2普通3绿色4蓝色4紫色5橙色6红色	
	icon: string, // 图标	
	pricetype: number, // 价格类型（1银币2元宝	
	price: number, // 出售价格	
	desc: string, // 简介
}

export default class Item {
	// 唯一id 
	onlyid: string = "";
	// 数据id 
	itemid: number = 0;
	// 名字
	name: string = "";
	// 数据
	private _itemData: ItemData = {
		id: 0, // id	
		name: "", // 名字	
		type: 0, // 类型（1元宝2银币3经验100消耗品101垃圾品102通用材料103药品材料104药品105装备材料106装备	
		kind: 0, // 类型（装备填装备id	
		quality: 0, // 品质（1垃圾2普通3绿色4蓝色4紫色5橙色6红色	
		icon: "", // 图标	
		pricetype: 0, // 价格类型（1银币2元宝	
		price: 0, // 出售价格	
		desc: "", // 简介
	}

	
	get itemData (){
		return this._itemData;
	}
	set itemData (n: ItemData){
		this._itemData = n;
		this.name = n.name;
	}
	// 位置 <10 在身上装备    >100 在背包    >1000 在仓库
	pos: number = 0;

	// 类型
	type: ItemType = ItemType.Waste;
	// 数量
	num: number = 0;

	consume(n: number = 1): boolean {
		if (this.num > n) {
			this.num -= n;
			return true;
		}
		return false;
	}

	fromJson(json: any) {
		for (const key in json) {
			// if(key == "attr"){
			// 	this.attr.fromJson(json[key]);
			// 	continue;
			// }
			this[key] = safeJson(json[key]);
		}
	}

	convType(t: ItemType): Item | null {
		return this;
	};
}