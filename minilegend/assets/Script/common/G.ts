// 地图块 数据
export const Cell = {
	width: 256,
	height: 256,
}

// 地图格子数据
export const Gird = {
	width: 40,
	height: 40,
}

// 生物类型
export enum LivingType {
	NOTHING = 0,
	OBJECT,
	NPC,
	MONSTER,
	PLAYER,
}
// 动作状态
export enum ActState {
	IDLE = 1,// 待机
	RUN,// 移动
	RATK,// 准备攻击
	ATK,// 攻击
	MGC,// 魔法
	DIE,// 死亡
}
// 技能计算回调
export interface AtkInfo {
	AtkType: number,
	AtkNum: number
}

// 技能主动性
export enum SkillActType {
	Active = 0,
	Passive,
}

// 技能攻击类型
export enum SkillMode {
	Physics = 1, // 物理攻击
	Magic,// 魔法攻击
	Taoist,// 道术攻击
	MagicBuff,
	TaoistBuff,
	Debuff,
}

export enum SkillType {
	Attack = 1,// 1 攻击力
	EnemyDef,// 2 敌人防御力
	SelfHurt,// 3 自身受到伤害
	TimeHurt,// 4 定时掉血
	AddHp,// 5 自身血量
	BeastAtk,// 6 神兽伤害
}

export enum SkillSubType {
	Plus = 1, // 加法
	Multi, // 乘法 百分比
}
// 技能ID
export const SkillIds = {
	NormalAttack: 10000, // 普通攻击
	GongShaJianFa: 10001,// 攻杀剑法
	LeiDianShu: 20001,//雷电术
	LingHunHuoFu: 30001, // 灵魂火符
}
// 技能名字
export const SkillName = {
	[SkillIds.NormalAttack]: "普通攻击",
	[SkillIds.GongShaJianFa]: "攻杀剑法",
	[SkillIds.LeiDianShu]: "雷电术",
	[SkillIds.LingHunHuoFu]: "灵魂火符",
}
// 技能简介
export const SkillDesc = {
	[SkillIds.NormalAttack]: "普通攻击",
	[SkillIds.GongShaJianFa]: "攻杀剑法",
	[SkillIds.LeiDianShu]: "雷电术",
	[SkillIds.LingHunHuoFu]: "灵魂火符",
}

export interface dropInfo {
	itemid: number,
	num: number,
}

export const DefaultOutLookCloth = 100;
export const DefaultOutLookWeapon = 100;
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//   
//							下面前后端通用部分
//
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const DefaultInLookCloth = 1;
export const MaxPower = 20; // 最大体力值
export const StartMapStage = { map: 10001, stage: 10001}; // 起始场景

export const ItemBagHolder = 100;


export interface RoleAttrDatas {
	level: number;
	MaxHp: number;
	Speed: number;
	AtkSpe: number;
	AtkMin: number;
	AtkMax: number;
	Defense: number;
	MatkMin: number;
	MatkMax: number;
	Mdefense: number;
	DatkMin: number;
	DatkMax: number;
	Ddefense: number;
}
export interface AttrDatas {
	ID: number;
	Hp1: number;
	Hp2: number;
	MaxHp1: number;
	MaxHp2: number;
	Speed1: number;
	Speed2: number;
	AtkSpe1: number;
	AtkSpe2: number;
	AtkMin1: number;
	AtkMin2: number;
	AtkMax1: number;
	AtkMax2: number;
	Defense1: number;
	Defense2: number;
	MatkMin1: number;
	MatkMin2: number;
	MatkMax1: number;
	MatkMax2: number;
	Mdefense1: number;
	Mdefense2: number;
	DatkMin1: number;
	DatkMin2: number;
	DatkMax1: number;
	DatkMax2: number;
	Ddefense1: number;
	Ddefense2: number;
}
export interface ArtiAttrDatas {
	Hit1: number;
	Hit2: number;
	Crit1: number;
	Crit2: number;
	CritAdd1: number;
	CritAdd2: number;
	Dodge1: number;
	Dodge2: number;
	Cut1: number;
	Cut2: number;
	CutPre1: number;
	CutPre2: number;
	Poison1: number;
	Poison2: number;
	Paralysis1: number;
	Paralysis2: number;
	Toughness1: number;
	Toughness2: number;
	Lucky1: number;
	Lucky2: number;
	Damnation1: number;
	Damnation2: number;
}

export enum AttrIds {
	Hp = 101,
	MaxHp,
	Speed,
	AtkSpe,
	AtkMin = 1001,
	AtkMax,
	Defense,
	MatkMin,
	MatkMax,
	Mdefense,
	DatkMin,
	DatkMax,
	Ddefense,
	Hit = 2001,
	Crit,
	CritAdd,
	Dodge,
	Cut,
	CutPre,
	Poison,
	Paralysis,
	Toughness,
	Lucky,
	Damnation,
}

export let AttrArray = [
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
	[AttrIds.AtkMin]: "AtkMin",
	[AttrIds.AtkMax]: "AtkMax",
	[AttrIds.Defense]: "Defense",
	[AttrIds.MatkMin]: "MatkMin",
	[AttrIds.MatkMax]: "MatkMax",
	[AttrIds.Mdefense]: "Mdefense",
	[AttrIds.DatkMin]: "DatkMin",
	[AttrIds.DatkMax]: "DatkMax",
	[AttrIds.Ddefense]: "Ddefense",
	[AttrIds.Hit]: "Hit",
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

export const AttrStrCn = {
	[AttrIds.Hp]: "血量",
	[AttrIds.MaxHp]: "血量最大值",
	[AttrIds.Speed]: "速度",
	[AttrIds.AtkSpe]: "攻击速度",
	[AttrIds.AtkMin]: "攻击力",
	[AttrIds.AtkMax]: "攻击力",
	[AttrIds.Defense]: "物理防御",
	[AttrIds.MatkMin]: "魔法攻击",
	[AttrIds.MatkMax]: "魔法攻击",
	[AttrIds.Mdefense]: "魔法防御",
	[AttrIds.DatkMin]: "道术攻击",
	[AttrIds.DatkMax]: "道术攻击",
	[AttrIds.Ddefense]: "道术防御",
	[AttrIds.Hit]: "命中",
	[AttrIds.Crit]: "暴击",
	[AttrIds.CritAdd]: "暴击加成",
	[AttrIds.Dodge]: "闪避",
	[AttrIds.Cut]: "切割率",
	[AttrIds.CutPre]: "切割伤害加成",
	[AttrIds.Poison]: "中毒率",
	[AttrIds.Paralysis]: "麻痹率",
	[AttrIds.Toughness]: "韧性",
	[AttrIds.Lucky]: "幸运",
	[AttrIds.Damnation]: "诅咒",
}

export enum ItemType {
	Gold = 1, // 元宝
	Coin, // 银币
	Exp, // 经验
	Consume = 100, // 消耗品
	Waste,
	ComMat, // 通用材料
	DrugMat,// 药品材料
	Drug,// 药品
	EquipMat,// 装备材料
	Equip,// 装备
}

export enum EquipPos {
	Weapon = 1, // 武器位置
	Necklace,
	Clothes,
	Ring1,
	Ring2,
	Shoes,
}