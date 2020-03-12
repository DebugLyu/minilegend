import skillMgr, { SkillData } from "../../manager/SkillMgr";
import { safeJson, lRandom } from "../../common/gFunc";
import { SkillMode, AttrIds, SkillType, SkillSubType } from "../../common/G";
import { Attribute } from "../attribute/attribute";

export default class Skill {
    skillid: number = 0;

    skilldata: SkillData = null;
    level: number = 0;

    cando: boolean = true;
    cooldownTimer: number;

    setData(skilldata: SkillData){
        if(skilldata == null){
            return;
        }
        this.skilldata = skilldata;
        this.skillid = skilldata.skillid;
    }

    cooldown(){
        if (this.skilldata.cooldown > 0) {
            this.cando = false;
            this.cooldownTimer = setTimeout(() => {
                this.cando = true;
            }, this.skilldata.cooldown * 1000);
        }
    }

    atk(atker: Attribute): number {
        let min = 0, max = 0;
        if(this.skilldata.mode == SkillMode.Physics){
            min = atker[AttrIds.AtkMin];
            max = atker[AttrIds.AtkMax];
        } else if (this.skilldata.mode == SkillMode.Magic) {
            min = atker[AttrIds.MatkMin];
            max = atker[AttrIds.MatkMax];
        } else if (this.skilldata.mode == SkillMode.Taoist) {
            min = atker[AttrIds.DatkMin];
            max = atker[AttrIds.DatkMax];
        }
        
        let base = lRandom(min, max);
        let hurt = base;
        if(this.skilldata.type == SkillType.Attack){
            let num = skillMgr.getSkillLevelData(this.skilldata.leveldata, this.level);
            if(this.skilldata.subtype == SkillSubType.Plus){
                hurt = base + num;
            } else {
                hurt = Math.floor(base * num / 100);
            }
        }

        this.cooldown();

        return hurt;
    }

    def(defer:Attribute){
        let subdef = 0;
        let base = 0;
        if (this.skilldata.mode == SkillMode.Physics) {
            base = defer[AttrIds.Defense];
        } else if (this.skilldata.mode == SkillMode.Magic) {
            base = defer[AttrIds.Mdefense];
        } else if (this.skilldata.mode == SkillMode.Taoist) {
            base = defer[AttrIds.Ddefense];
        }
        subdef = base;

        if(this.skilldata.type == SkillType.EnemyDef){
            let num = skillMgr.getSkillLevelData(this.skilldata.leveldata, this.level);
            if (this.skilldata.subtype == SkillSubType.Plus) {
                subdef = base - num;
            } else {
                subdef = Math.floor(base * (100 - num) / 100);
            }
        }
        return subdef;
    }

    fromJson(json: any) {
        for (const key in json) {
            this[key] = safeJson(json[key]);
        }
    }
}