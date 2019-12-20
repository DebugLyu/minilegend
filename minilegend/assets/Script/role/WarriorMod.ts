import LivingMod from "./LivingMod";
import { Attribute, AttrIds, AtkInfo, AtkType } from "../common/G";
import SkillMgr, { SkillBase } from "../manager/SkillMgr";
import WarriorCtr from "./WarriorCtr";

export default class WarriorMod extends LivingMod {
    // 属性值
    attr: Attribute = new Attribute();
    // 是否死亡
    isdead: boolean = false;
    // 技能列表
    skillList: SkillBase[] = [];
    
    get control(): WarriorCtr{
        return <WarriorCtr>this._control;
    }

    set hp(hp: number) {
        this.attr[AttrIds.Hp] = hp;
        this.checkHp();
    }
    get hp(): number {
        return this.attr[AttrIds.Hp];
    }

    init(){
        super.init();
    }

    dead() {
        this.attr[AttrIds.Hp] = 0;
        this.isdead = true;
        this.control.dead();
    }

    checkHp() {
        let maxhp = this.getAttr(AttrIds.MaxHp);
        if(this.hp > maxhp){
            this.setAttr(AttrIds.Hp, maxhp);
        }
        if (this.hp <= 0) {
            this.dead();
        }
    }

    behit(atkinfo: AtkInfo){
        let atk = atkinfo.AtkNum;
        let def = 0;
        if(atkinfo.AtkType == AtkType.Physics){
            def = this.attr[AttrIds.Defense];
        }
        if(atkinfo.AtkType == AtkType.Magic){
            def = this.attr[AttrIds.Mdefense];
        }
        if(atkinfo.AtkType == AtkType.Taoist){
            def = this.attr[AttrIds.Ddefense];
        }
        atk = atk - def;
        this.hp -= atk;
    }

    getAttr(attrid: AttrIds): number {
        return this.attr[attrid];
    }

    setAttr(attrid: AttrIds, num: number){
        this.attr[attrid] = num;
    }

    initSkill(skills: number[]) {
        for (let i = 0; i < skills.length; i++) {
            const skillid = skills[i];
            let skillclass = SkillMgr.instance.getSkill(skillid);
            this.skillList.push(new skillclass());
        }
    }

    getSkill(skillid: number){
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if(skill.skillId == skillid){
                return skill;
            }
        }
        return null;
    }

    aiSkill(targetPos:cc.Vec2): SkillBase {
        let len = cc.v2(this.x, this.y).sub(targetPos).mag();
        let list = [];
        // 优先选择 在范围内的
        for (let i = 0; i < this.skillList.length; i++) {
            const skill = this.skillList[i];
            if(skill.range >= len && skill.cando){
                list.push(skill);
            }
        }

        if(list.length > 0){
            if(list.length == 1){
                return list[0];
            }

            list.sort((a, b)=>{
                return a.aiLevel - b.aiLevel;
            });

            return list[0];
        }
        return null;
    }
}