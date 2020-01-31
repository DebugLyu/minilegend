import { getPropData } from "../common/gFunc";

export interface ItemData {
	itemid: number;
	kind: number;
	subkind: number;
	name: string;
	icon: number;
	desc: string
}
class ItemMgr {
	private itemList: { [key: number]: ItemData } = {};

	async init() {
		this.itemList = await getPropData("prop_item");
	}

	getItemData(itemid: number): ItemData{
		return this.itemList[itemid];
	}
}
let itemMgr = new ItemMgr();
export default itemMgr;