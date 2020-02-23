import { SkillData } from "../../manager/SkillMgr";
import { safeJson } from "../../common/gFunc";

export default class Skill {
    skillid: number = 0;

    skilldata: SkillData = null;
    level: number = 0;
    fromJson(json: any) {
        for (const key in json) {
            this[key] = safeJson(json[key]);
        }
    }
}