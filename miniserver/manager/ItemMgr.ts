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

class ItemMgr {
	private itemList: { [key: number]: ItemData } = {};

	// async init() {
	//     let getRes = (await import("../common/gFunc")).getRes;
	//     let data = await getRes("/prop_data/prop_item", cc.JsonAsset);
	//     let json = data.json;
	//     this.itemList = json;
	// }

	async init() {
		let RootDir = (await import("../common/gFunc")).RootDir;
		let data = require(RootDir("../app/prop_data/prop_item"));
		this.itemList = data;
	}

	getItemData(itemid: number): ItemData{
		return this.itemList[itemid];
	}
}
let itemMgr = new ItemMgr();
export default itemMgr;