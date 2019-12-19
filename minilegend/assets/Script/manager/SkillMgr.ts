import { SkillIds, SkillName, SkillDesc, SkillType, Attribute, AttrIds, AtkType, SkillActType } from "../common/G"

class SkillBase {
    private _skillId: number = 0;
    set skillId(skillid: number) {
        this._skillId = skillid;
        this.skillName = SkillName[this._skillId];
        this.icon = skillid;
        this.desc = SkillDesc[this._skillId];

    }
    get skillId(): number {
        return this._skillId;
    }
    // 技能名字
    skillName: string = "";
    // 技能图标
    icon: number = 0;
    // 技能简介
    desc: string = "";
    // 冷却时间
    cooldown: number = 1;

    // 技能类型 0 攻击技能 1 buff技能 2 debuff技能
    skillType: SkillType = SkillType.ATTACK;
    // 技能主动性 0 主动 1 被动
    skillAct: SkillActType = SkillActType.active;
    // 自己身上特效
    selfEffect: number = 0;
    // 敌人身上特效
    enemyEffect: number = 0;
    // 飞行特效
    flyEffect: number = 0;
    
}

interface AtkInfo {
    AtkType: number,
    AtkNum: number
}

export class NormalAttack extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.NormalAttack;
    }

    getatk(attacker: Attribute): AtkInfo {
        return { AtkType: AtkType.Physics, AtkNum: attacker[AttrIds.Attack] };
    }
}

export class GongShaJianFa extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.GongShaJianFa;
        this.skillAct = SkillActType.passive;
    }

    getatk(attacker: Attribute): AtkInfo {
        let atknum = Math.floor(attacker[AttrIds.Attack] * 110 / 100);
        return { AtkType: AtkType.Physics, AtkNum: atknum };
    }
}

export class LeiDianShu extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.LeiDianShu;
        this.skillAct = SkillActType.active;
    }

    getatk(attacker: Attribute): AtkInfo {
        let atknum = 96 + Math.floor(attacker[AttrIds.Mattack]);
        return { AtkType: AtkType.Physics, AtkNum: atknum };
    }
}

export class LingHunHuoFu extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.LingHunHuoFu;
        this.skillAct = SkillActType.active;
    }

    getatk(attacker: Attribute): AtkInfo {
        let atknum = 96 + Math.floor(attacker[AttrIds.Mattack]);
        return { AtkType: AtkType.Physics, AtkNum: atknum };
    }
}


export default class SkillMgr {
    // 单例
    private static instance: SkillMgr = null;
    public static getInstance(): SkillMgr {
        if (this.instance == null) {
            this.instance = new SkillMgr();
        }
        return this.instance;
    }

    skillList: Map<number, SkillBase> = new Map<number, SkillBase>();

    init(){
        this.skillList.set( SkillIds.NormalAttack, new NormalAttack());
        this.skillList.set( SkillIds.GongShaJianFa, new GongShaJianFa());
        this.skillList.set( SkillIds.LeiDianShu, new LeiDianShu());
        this.skillList.set( SkillIds.LingHunHuoFu, new LingHunHuoFu());

        // let skilldata =  <NormalAttack>this.skillList.get(SkillIds.NormalAttack);
    }


}