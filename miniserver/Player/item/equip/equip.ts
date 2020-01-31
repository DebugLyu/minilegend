import { Attribute, AttrIds } from "../../../common/G"
import item from "../item";


export default class equip extends item {
	// 主属性
	attr: Attribute = new Attribute();
	// 炼化属性
	artiAttr: Attribute = new Attribute();

	getAttr() {
		return this.attr.add(this.artiAttr);
	}
}