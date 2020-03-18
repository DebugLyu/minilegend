import { ItemType, AttrIds, AttrArray } from "../../../common/G"
import Item from "../Item";
import { random } from "../../../common/gFunc";
import { Attribute } from "../../attribute/attribute";

let random_min = 10;
let random_max = 999999;

function attrRandom() {
	return random(random_min, random_max);
}

export interface EquipData {
	id: number;      // 装备id
	wear: number;    // 穿戴位置
	inlook: number;  // 内观id
	outlook: number; // 外观id
	attr: number;    // 主属性id
	arti: number;    // 副属性id
	artinum: number; // 副属性个数
}

export default class Equip extends Item {

	// 装备id 装备配置表id
	equipid: number = 0;
	
	// 主属性
	attr: Attribute = new Attribute();

	// 炼化属性
	artiAttr: Attribute = new Attribute();

	// 偏移属性
	private attrOffset: Attribute = new Attribute();
	private artiAttrOffset: Attribute = new Attribute();

	constructor() {
		super();
		this.type = ItemType.Equip;
		this.randomOffset();
	}

	private randomOffset(isattr: boolean | null = null) {
		if (isattr == null) {
			for (const key of AttrArray) {
				this.attrOffset[key] = attrRandom();
				this.artiAttrOffset[key] = attrRandom();
			}
		} else {
			if (isattr) {
				for (const key of AttrArray) {
					this.attrOffset[key] = attrRandom();
				}
			} else {
				for (const key of AttrArray) {
					this.artiAttrOffset[key] = attrRandom();
				}
			}
		}
	}

	setAttr(key: AttrIds, num: number){
		this.attrOffset[key] = attrRandom();
		this.attr[key] = num + this.attrOffset[key];
	}

	setArtiAttr(key: AttrIds, num: number){
		this.artiAttrOffset[key] = attrRandom();
		this.artiAttr[key] = num + this.artiAttrOffset[key];
	}

	getAttr(key:AttrIds){
		return this.attr[key] - this.attrOffset[key];
	}

	getArtiAttr(key: AttrIds){
		return this.artiAttr[key] - this.artiAttrOffset[key];
	}

	getTotalAttr(key: AttrIds) {
		let attrnum = this.getAttr(key);
		let artiattrnum = this.getArtiAttr(key);
		return attrnum + artiattrnum;
	}

	convType(t: ItemType): Equip | null {
		if (this.type == t) {
			return this;
		}
		return null;
	}
}