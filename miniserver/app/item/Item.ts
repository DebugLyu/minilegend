import { ItemType } from "../../common/G";
import { getRandomString, safeJson } from "../../common/gFunc";
import { md5 } from "../../util/crypto";
import itemMgr from "../../manager/ItemMgr";


export default class Item {
	// 唯一id 
	onlyid: string = md5(getRandomString(10) + "" + Date.now() + getRandomString(9)) ;

	// 数据id 物品配置表id
	itemid: number = 0;

	// 名字
	name: string = "";

	// 类型
	type: ItemType = ItemType.Waste;

	// 数量
	num: number = 0;

	init(){
		if(this.itemid == 0){
			return;
		}
		let itemData = itemMgr.getItemData(this.itemid);
		this.name = itemData.name;
	}

	fromJson(json: any) {
		// for (const key in json) {
		// 	this[key] = safeJson(json[key]);
		// }
		Object.assign(this, json);
	}

	consume(n: number = 1): boolean {
		if (this.num > n) {
			this.num -= n;
			return true;
		}
		return false;
	}


	convType(t: ItemType): Item | null{
		return this;
	};
}