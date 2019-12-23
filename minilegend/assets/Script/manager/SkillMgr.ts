import { SkillIds, SkillName, SkillDesc, SkillType, Attribute, AttrIds, SkillAtkType, SkillActType } from "../common/G"
import { random } from "../common/gFunc";

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
    cando = true;
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
    type: SkillType = SkillType.ATTACK;
    // 技能主动性 0 主动 1 被动
    actType: SkillActType = SkillActType.Active;
    // 攻击类型
    atkType: SkillAtkType = SkillAtkType.Physics;
    // 自己身上特效
    selfEffect: number = 0;
    // 敌人身上特效
    enemyEffect: number = 0;
    enemyEffOffset: cc.Vec2 = cc.Vec2.ZERO;
    // 飞行特效 如果没有飞行特效，不存在子弹，技能是必中的
    flyEffect: number = 0;
    // 技能范围
    range: number = 1;
    // AI优先级
    aiLevel: number = 0;

    getatk(attacker: Attribute): number {
        return random(attacker[AttrIds.AtkMin], attacker[AttrIds.AtkMax]);
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
    SkillId: number,
    AtkType: number,
    AtkNum: number,
}

export class NormalAttack extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.NormalAttack;
        this.range = 2;
    }

    getatk(attacker: Attribute): number {
        return random(attacker[AttrIds.AtkMin], attacker[AttrIds.AtkMax]);
    }
}

export class GongShaJianFa extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.GongShaJianFa;
        this.actType = SkillActType.Passive;
        this.aiLevel = 1;
        this.range = 3;
    }

    getatk(attacker: Attribute): number {
        let atknum = random(attacker[AttrIds.AtkMin], attacker[AttrIds.AtkMax]);
        atknum = Math.floor(atknum * 110 / 100);
        return atknum;
    }
}

export class LeiDianShu extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.LeiDianShu;
        this.actType = SkillActType.Active;
        this.aiLevel = 1;
        this.range = 10;
        this.selfEffect = 200011;
        this.enemyEffect = 20001;
        this.enemyEffOffset = cc.v2(0, 110);
    }

    getatk(attacker: Attribute): number {
        return 96 + random(attacker[AttrIds.MatkMin], attacker[AttrIds.MatkMax]);
    }
}

export class LingHunHuoFu extends SkillBase {
    constructor() {
        super();
        this.skillId = SkillIds.LingHunHuoFu;
        this.actType = SkillActType.Active;
        this.aiLevel = 1;
        this.range = 10;
    }

    getatk(attacker: Attribute): number {
        return 80 + random(attacker[AttrIds.DatkMin], attacker[AttrIds.DatkMax]);
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