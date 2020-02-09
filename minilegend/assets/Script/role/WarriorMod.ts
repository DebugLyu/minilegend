import LivingMod from "./LivingMod";
import { Attribute, AttrIds, AtkInfo, SkillAtkType } from "../common/G";
import WarriorCtr from "./WarriorCtr";
import skillMgr, { SkillBase, NormalAttack } from "../manager/SkillMgr";

export default class WarriorMod extends LivingMod {
    // 属性值
    attr: Attribute = new Attribute();
    // 是否死亡
    isDead: boolean = false;
    // 技能列表
    skillList: SkillBase[] = [];

    get control(): WarriorCtr {
        return this._control as WarriorCtr;
    }

    set hp(hp: number) {
        this.attr[AttrIds.Hp] = hp;
        this.checkHp();
    }
    get hp(): number {
        return this.attr[AttrIds.Hp];
    }

    constructor(control?: WarriorCtr) {
        super(control);
        this.skillList.push(new NormalAttack());
    }

    init() {
        super.init();
    }

    dead() {
        if(this.isDead){
            return;
        }
        this.attr[AttrIds.Hp] = 0;

        this.isDead = true;
        this.control.dead();
    }

    checkHp() {
        let maxhp = this.getAttr(AttrIds.MaxHp);
        if (this.hp > maxhp) {
            this.setAttr(AttrIds.Hp, maxhp);
        }
        if (this.hp <= 0) {
            this.dead();
        }
    }

    beHit(atknum: number, skill: SkillBase) {
        if (atknum == 0) {
            return;
        }

        let def = 0;
        if (skill.atkType == SkillAtkType.Physics) {
            def = this.attr[AttrIds.Defense];
        } else if (skill.atkType == SkillAtkType.Magic) {
            def = this.attr[AttrIds.Mdefense];
        } else if (skill.atkType == SkillAtkType.Taoist) {
            def = this.attr[AttrIds.Ddefense];
        }
        atknum -= def;
        this.hp -= atknum;
        return atknum;
    }

    getAttr(attrid: AttrIds): number {
        return this.attr[attrid];
    }

    setAttr(attrid: AttrIds, num: number) {
        this.attr[attrid] = num;
    }

    initSkill(skills: number[]) {
        for (let i = 0; i < skills.length; i++) {
            const skillid = skills[i];
            let skillclass = skillMgr.getSkill(skillid);
            this.skillList.push(new skillclass());
        }
    }

    getSkill(skillid: number) {
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if (skill.skillId == skillid) {
                return skill;
            }
        }
        return null;
    }

    aiSkill(targetPos: cc.Vec2): SkillBase {
        let len = cc.v2(this, this.y).sub(targetPos).mag();
        let list = [];
        // 优先选择 在范围内的
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if (skill.range >= len && skill.cando) {
                list.push(skill);
            }
        }

        if (list.length > 0) {
            if (list.length == 1) {
                return list[0];
            }

            list.sort((a, b) => {
                return a.aiLevel - b.aiLevel;
            });

            return list[0];
        }
        return null;
    }

    relive(){
        this.attr[AttrIds.Hp] = this.attr[AttrIds.MaxHp];
        this.isDead = false;
    }
}