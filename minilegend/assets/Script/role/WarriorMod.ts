import LivingMod from "./LivingMod";
import { AttrIds, SkillIds } from "../common/G";
import WarriorCtr from "./WarriorCtr";
import Skill from "../app/skill/Skill";
import skillMgr from "../manager/SkillMgr";
import { Attribute } from "../app/attribute/attribute";

export default class WarriorMod extends LivingMod {
    // 属性值
    attr: Attribute = new Attribute();
    // 是否死亡
    isDead: boolean = false;
    // 技能列表
    skillList: Skill[] = [];

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
    }

    init() {
        super.init();

        let skill = new Skill();
        let skilldata = skillMgr.getSkillData(SkillIds.NormalAttack);
        skill.setData(skilldata);
        // this.skillList.push(skill);
        this.skillList.push(skill);
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

    beHit(atknum: number, skill: Skill) {
        if (atknum == 0) {
            return;
        }

        let def = skill.def(this.attr);
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

    initSkill(skills: Skill[]) {
        // for (let i = 0; i < skills.length; i++) {
        //     const skillid = skills[i];
        //     let skillclass = skillMgr.getSkill(skillid);
        //     this.skillList.push(new skillclass());
        // }
        this.skillList = skills;
    }

    getSkill(skillid: number) {
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if (skill.skillid == skillid) {
                return skill;
            }
        }
        return null;
    }

    aiSkill(targetPos: cc.Vec2): Skill {
        let len = cc.v2(this, this.y).sub(targetPos).mag();
        let list = [];
        // 优先选择 在范围内的
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if(skill.level <= 0){
                continue;
            }
            if (skill.skilldata.range >= len && skill.cando) {
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