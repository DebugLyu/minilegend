import {SkillInfo, SkillType, Attribute, AttrIds, AtkType, SkillActType as SkillAct} from "../common/G"
import LivingMod from "../role/LivingMod";
import WarriorMod from "../role/WarriorMod";

class SkillBase {
    private _skillId: number = 0;
    set skillId(skillid: number){
        this._skillId = skillid;
        this.skillName = SkillInfo.SkillName[this._skillId];
        this.icon = skillid;
        this.desc = SkillInfo.SkillDesc[this._skillId];

    }
    get skillId(): number{
        return this._skillId;
    }
    skillName: string = "";
    icon: number = 0;
    desc: string = "";

    skillType: SkillType = SkillType.ATTACK;
    skillAct:SkillAct = SkillAct.active;
}

interface AtkInfo {
    AtkType: number,
    AtkNum: number
}

export class NormalAttack extends SkillBase {
    constructor(){
        super();
        this.skillId = SkillInfo.SkillIds.NormalAttack;    
    }
    
    getatk(attacker: Attribute): AtkInfo{
        return {AtkType: AtkType.Physics, AtkNum: attacker[AttrIds.Attack]};
    }
}

export class GongShaJianFa extends SkillBase {
    constructor(){
        super();
        this.skillId = SkillInfo.SkillIds.GongShaJianFa;
        this.skillAct = SkillAct.passive;
    }
    
    getatk(attacker: Attribute): AtkInfo{
        let atknum = Math.floor(attacker[AttrIds.Attack] * 110 / 100);
        return {AtkType: AtkType.Physics, AtkNum: atknum};
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
}