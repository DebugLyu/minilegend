import Item, { ItemData } from "../app/item/Item";
import { ErrList } from "../common/ErrorList";
import Equip from "../app/item/equip/Equip";
import EquipMat from "../app/item/equip/EquipMat";
import { ItemType } from "../common/G";
import equipMgr from "./EquipMgr";

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

	genItem(itemid: number, num: number): number | Item{
		let itemdata = this.getItemData(itemid);
		if(!itemdata){
			return ErrList.Item_ID_NOT_Found;
		}
		let item: Equip | EquipMat | null  = null;
		if(itemdata.type == ItemType.Equip){
			item = equipMgr.genEquip(itemid);
		}
		if(itemdata.type == ItemType.EquipMat){
			item = new EquipMat();
		}

		if(item == null){
			return ErrList.Item_Create_Error;
		}
		item.itemid = itemdata.id;
		item.itemData = itemdata;
		item.num = num;
		item.name = itemdata.name;
		return item;
	}
}
let itemMgr = new ItemMgr();
export default itemMgr;