import { AttrIds, AttrArray, AttrStr } from "../../common/G";


export class Attribute {
	[AttrIds.Hp]: number = 0;
	[AttrIds.MaxHp]: number = 0;
	[AttrIds.Speed]: number = 240;
	[AttrIds.AtkSpe]: number = 1500;
	[AttrIds.AtkMin]: number = 0;
	[AttrIds.AtkMax]: number = 0;
	[AttrIds.Defense]: number = 0;
	[AttrIds.MatkMin]: number = 0;
	[AttrIds.MatkMax]: number = 0;
	[AttrIds.Mdefense]: number = 0;
	[AttrIds.DatkMin]: number = 0;
	[AttrIds.DatkMax]: number = 0;
	[AttrIds.Ddefense]: number = 0;
	[AttrIds.Hit]: number = 0;
	[AttrIds.Crit]: number = 0;
	[AttrIds.CritAdd]: number = 0;
	[AttrIds.Dodge]: number = 0;
	[AttrIds.Cut]: number = 0;
	[AttrIds.CutPre]: number = 0;
	[AttrIds.Poison]: number = 0;
	[AttrIds.Paralysis]: number = 0;
	[AttrIds.Toughness]: number = 0;
	[AttrIds.Lucky]: number = 0;
	[AttrIds.Damnation]: number = 0;

	setAttr(attrn: any){
		for (const key of AttrArray) {
			let value = attrn[AttrStr[key]];
			if(value){
				this[key] = value;
			}
		}
	}

	fromJson(json: any){
		for (const key in json) {
			if (json.hasOwnProperty(key)) {
				this[key] = json[key];
			}
		}
	}

	add(attr: Attribute): Attribute {
		for (const key of AttrArray) {
			this[key] += attr[key];
		}
		return this;
	}

	addCopy(attr: Attribute): Attribute {
		let attrn = new Attribute();
		for (const key of AttrArray) {
			attrn[key] = this[key] + attr[key];
		}
		return attrn;
	}

	clone(): Attribute {
		let attrn = new Attribute();
		for (const key of AttrArray) {
			attrn[key] = this[key];
		}
		return attrn;
	}
}
