
export enum LivingType {
	NOTHING = 0,
	OBJECT,
	NPC,
	MONSTER,
	PLAYER,
}

export enum ActState {
	IDLE = 0,
	RUN,
	RATK,
	ATK,
	MGC,
	DIE,
}


export enum SkillType {
	ATTACK = 0,
	BUFF,
	DEBUFF,
}

export enum SkillActType {
	active  = 0,
	passive,
}

export const SkillInfo = {
	SkillIds : {
		NormalAttack: 10000, // 普通攻击
		GongShaJianFa: 10001,// 攻杀剑法
		LeiDianShu: 20001,//雷电术
		LingHunHuoFu: 30001, // 灵魂火符
	},
	
	SkillName : {
		[this.SkillIds.NormalAttack]: "普通攻击",
		[this.SkillIds.GongShaJianFa]: "攻杀剑法",
		[this.SkillIds.LeiDianShu]: "雷电术",
		[this.SkillIds.LingHunHuoFu]: "灵魂火符",
	},
	SkillDesc : {
		[this.SkillIds.NormalAttack]: "普通攻击",
		[this.SkillIds.GongShaJianFa]: "攻杀剑法",
		[this.SkillIds.LeiDianShu]: "雷电术",
		[this.SkillIds.LingHunHuoFu]: "灵魂火符",
	}
}

export enum AtkType {
	Physics = 0,
	Magic,
	Taoist,
}

export enum AttrIds {
	Hp = 0,
	MaxHp,
	Speed,
	Attack = 101,
	Defense,
	Mattack,
	Mdefense,
	Dattack,
	Ddefense,
}

export class Attribute {
	[AttrIds.Attack] : number = 0;
	[AttrIds.MaxHp] : number = 0;
	[AttrIds.Speed] : number = 300;
	[AttrIds.Attack] : number = 0;
	[AttrIds.Defense] : number = 0;
	[AttrIds.Mattack] : number = 0;
	[AttrIds.Mdefense] : number = 0;
	[AttrIds.Dattack] : number = 0;
	[AttrIds.Ddefense] : number = 0;
}