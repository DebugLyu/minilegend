export enum AgentKind {
	Server = 1,
	Client = 9,
}

export interface ResInterface {
	send: (arg0: any) => void,
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//   
//							下面前后端通用部分
//
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export enum AttrIds {
	Hp = 10,// 当前生命值
	MaxHp,// 最大生命值
	Speed,// 移动速度
	AtkSpe, // 攻击速度
	AtkMin = 101,// 攻击力
	AtkMax,
	Defense,// 防御力
	MatkMin,// 魔法攻击力
	MatkMax,
	Mdefense,// 魔法防御力
	DatkMin,// 道术攻击力
	DatkMax,
	Ddefense,// 道术防御力
	Hit = 201,// 准确（命中）
	Crit,// 暴击率
	CritAdd,// 暴击伤害加成
	Dodge,// 闪避率
	Cut,// 切割率
	CutPre,// 切割伤害百分比
	Poison,// 中毒率
	Paralysis,// 麻痹率
	Toughness,// 韧性
	Lucky,// 幸运
	Damnation,// 诅咒
}

export const AttrIdsArray = [
	AttrIds.Hp,
	AttrIds.MaxHp,
	AttrIds.Speed,
	AttrIds.AtkSpe,
	AttrIds.AtkMin,
	AttrIds.AtkMax,
	AttrIds.Defense,
	AttrIds.MatkMin,
	AttrIds.MatkMax,
	AttrIds.Mdefense,
	AttrIds.DatkMin,
	AttrIds.DatkMax,
	AttrIds.Ddefense,
	AttrIds.Hit,
	AttrIds.Crit,
	AttrIds.CritAdd,
	AttrIds.Dodge,
	AttrIds.Cut,
	AttrIds.CutPre,
	AttrIds.Poison,
	AttrIds.Paralysis,
	AttrIds.Toughness,
	AttrIds.Lucky,
	AttrIds.Damnation,
]

export const AttrStr = {
	[AttrIds.Hp]: "Hp",
	[AttrIds.MaxHp]: "MaxHp",
	[AttrIds.Speed]: "Speed",
	[AttrIds.AtkSpe]: "AtkSpe",
	[AttrIds.AtkMin]: "AtkMin ",
	[AttrIds.AtkMax]: "AtkMax",
	[AttrIds.Defense]: "Defense",
	[AttrIds.MatkMin]: "MatkMin",
	[AttrIds.MatkMax]: "MatkMax",
	[AttrIds.Mdefense]: "Mdefense",
	[AttrIds.DatkMin]: "DatkMin",
	[AttrIds.DatkMax]: "DatkMax",
	[AttrIds.Ddefense]: "Ddefense",
	[AttrIds.Hit]: "Hit ",
	[AttrIds.Crit]: "Crit",
	[AttrIds.CritAdd]: "CritAdd",
	[AttrIds.Dodge]: "Dodge",
	[AttrIds.Cut]: "Cut",
	[AttrIds.CutPre]: "CutPre",
	[AttrIds.Poison]: "Poison",
	[AttrIds.Paralysis]: "Paralysis",
	[AttrIds.Toughness]: "Toughness",
	[AttrIds.Lucky]: "Lucky",
	[AttrIds.Damnation]: "Damnation",
}

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

	add(attr: Attribute): Attribute {
		let attrn = new Attribute();
		for (const attrid of AttrIdsArray) {
			attrn[attrid] = this[attrid] + attr[attrid]; 
		}
		return attrn;
	}
}

export enum ItemType {
	Gold = 1, // 元宝
	Coin, // 银币
	Exp, // 经验
	Consume = 100, // 消耗品
	Waste, // 垃圾品
	ComMat, // 通用材料
	DrugMat,// 药品材料
	Drug,// 药品
	EquipMat,// 装备材料
	Equip,// 装备
}

export enum EquipPos {
	Weapon = 1, // 武器位置
	Hat,
	Clothes,
	Ring1,
	Ring2,
	Shoes,
}