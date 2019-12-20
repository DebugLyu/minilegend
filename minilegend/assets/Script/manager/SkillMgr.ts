import { SkillIds, SkillName, SkillDesc, SkillType, Attribute, AttrIds, AtkType, SkillActType } from "../common/G"

export class SkillBase {
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
    cando = false;
    // 技能名字
    skillName: string = "";
    // 技能图标
    icon: number = 0;
    // 技能简介
    desc: string = "";
    // 冷却时间
    cooldown: number = 1;
    cooldownTimer: number = 0;

    // 技能等级
    level: number = 0;

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
    // 技能范围
    range: number = 1;
    // AI优先级
    aiLevel: number = 0;

    getatk(attacker: Attribute): AtkInfo {
        return { AtkType: AtkType.Physics, AtkNum: attacker[AttrIds.Attack] };
    }

    do() {
        if (this.cooldown > 0) {
            this.cando = false;
            this.cooldownTimer = setTimeout(() => {
                this.cando = true;
            }, this.cooldown * 1000);
        }
    }
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
        this.aiLevel = 1;
        this.range = 2;
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
        this.aiLevel = 1;
        this.range = 10;
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
        this.aiLevel = 1;
        this.range = 10;
    }

    getatk(attacker: Attribute): AtkInfo {
        let atknum = 96 + Math.floor(attacker[AttrIds.Mattack]);
        return { AtkType: AtkType.Physics, AtkNum: atknum };
    }
}


export default class SkillMgr {
    // 单例
    private static _instance: SkillMgr = null;
    public static get instance(): SkillMgr {
        if (this._instance == null) {
            this._instance = new SkillMgr();
        }
        return this._instance;
    }

    skillList = {
        [SkillIds.NormalAttack]: NormalAttack,
        [SkillIds.GongShaJianFa]: GongShaJianFa,
        [SkillIds.LeiDianShu]: LeiDianShu,
        [SkillIds.LingHunHuoFu]: LingHunHuoFu,
    }

    init() {

    }

    getSkill(skillid: number) {
        return this.skillList[skillid];
    }
}