import { getPropData } from "../common/gFunc";

export interface ItemData {
	itemid: number;
	kind: number;
	subkind: number;
	name: string;
	icon: number;
	desc: string
}
export default class ItemMgr {
	private static _instance: ItemMgr = null
	public static get instance(): ItemMgr {
		if (this._instance == null) {
			this._instance = new ItemMgr();
		}
		return this._instance;
	}

	private itemList: { [key: number]: ItemData } = {};

	async init() {
		this.itemList = await getPropData("prop_item");
	}

	getItemData(itemid: number): ItemData{
		return this.itemList[itemid];
	}
}