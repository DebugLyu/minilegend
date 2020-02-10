import { ItemData } from "../app/item/Item";

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