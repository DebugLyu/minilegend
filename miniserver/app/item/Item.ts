import { ItemType } from "../../common/G";

export default abstract class Item {
	// 唯一id 
	onlyid: number = 0;
	// 名字
	name: string = "";
	// 数据id
	dataid: number = 0;
	// 位置 <10 在身上装备    >10 在背包    >1000 在仓库
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


	abstract convType(t: ItemType): Item | null;
}