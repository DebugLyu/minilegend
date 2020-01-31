import { getPropData } from "../common/gFunc";

export interface ItemData {
	itemid: number;
	kind: number;
	subkind: number;
	name: string;
	icon: number;
	desc: string
}
class __ItemMgr__ {
	private itemList: { [key: number]: ItemData } = {};

	async init() {
		this.itemList = await getPropData("prop_item");
	}

	getItemData(itemid: number): ItemData{
		return this.itemList[itemid];
	}
}
let itemMgr = new __ItemMgr__();
export default itemMgr;