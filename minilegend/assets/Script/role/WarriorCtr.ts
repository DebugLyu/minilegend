import LivingCtr from "./LivingCtr";
import WarriorMod from "./WarriorMod";
import { ActState, SkillMode, SkillIds } from "../common/G";
import Skill from "../app/skill/Skill";
import skillMgr from "../manager/SkillMgr";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WarriorCtr extends LivingCtr {
    model:WarriorMod = new WarriorMod(this);

    idle(dir: number = null) {
        if(this.model.isDead){
            return;
        }
        super.idle(dir);
    }

    attack(dir?: number){
        if (this.model.isDead) {
            return;
        }
        this.runAction(dir, ActState.ATK);
    }

    magic(dir?: number){
        if (this.model.isDead) {
            return;
        }
        this.runAction(dir, ActState.MGC);
    }

    move(dir: number) {
        if (this.model.isDead) {
            return;
        }
        this.runAction(dir, ActState.RUN);
    }

    dead() {
        this.runAction(2, ActState.DIE);
        this.role.die();
    }


    doSkill(skill:Skill, dir?: number){
        if (this.model.isDead) {
            return;
        }
        
        if(skill.skilldata.atktype == SkillMode.Physics){
            this.attack(dir);
        } else{
            this.magic(dir);   
        }
        // 下面播放 技能在 自身身上的特效
        if (skill.skilldata.selfeffect == 0){
            return;
        }
        this.playEffect(skill.skilldata.selfeffect);
    }
    
    beHit(skill: Skill){
    }
}