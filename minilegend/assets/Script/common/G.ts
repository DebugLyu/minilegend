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

// 技能类型
export enum SkillType {
	ATTACK = 0,
	BUFF,
	DEBUFF,
}
// 技能主动性
export enum SkillActType {
	Active = 0,
	Passive,
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
// 技能攻击类型
export enum SkillAtkType {
	Physics = 0, // 物理攻击
	Magic,// 魔法攻击
	Taoist,// 道术攻击
}

export enum AttrIds {
	Hp = 0,// 当前生命值
	MaxHp,// 最大生命值
	Speed,// 移动速度
	AtkMin = 101,// 攻击力
	AtkMax,
	Defense,// 防御力
	MatkMin,// 魔法攻击力
	MatkMax,
	Mdefense,// 魔法防御力
	DatkMin,// 道术攻击力
	DatkMax,
	Ddefense,// 道术防御力
}

export const AttrStr = {
	[AttrIds.Hp]: "Hp",
	[AttrIds.MaxHp]: "MaxHp",
	[AttrIds.Speed]: "Speed",
	[AttrIds.AtkMin]: "AtkMin",
	[AttrIds.AtkMax]: "AtkMax",
	[AttrIds.Defense]: "Defense",
	[AttrIds.MatkMin]: "MatkMin",
	[AttrIds.MatkMax]: "MatkMax",
	[AttrIds.Mdefense]: "Mdefense",
	[AttrIds.DatkMin]: "DatkMin",
	[AttrIds.DatkMax]: "DatkMax",
	[AttrIds.Ddefense]: "Ddefense",
}

export class Attribute {
	[AttrIds.Hp]: number = 0;
	[AttrIds.MaxHp]: number = 0;
	[AttrIds.Speed]: number = 240;
	[AttrIds.AtkMin]: number = 0;
	[AttrIds.AtkMax]: number = 0;
	[AttrIds.Defense]: number = 0;
	[AttrIds.MatkMin]: number = 0;
	[AttrIds.MatkMax]: number = 0;
	[AttrIds.Mdefense]: number = 0;
	[AttrIds.DatkMin]: number = 0;
	[AttrIds.DatkMax]: number = 0;
	[AttrIds.Ddefense]: number = 0;
}

export interface dropInfo {
    itemid: number,
    num: number,
}