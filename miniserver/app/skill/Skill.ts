import { safeJson } from "../../common/gFunc";

export default class Skill {
    skillid: number = 0;

    // 技能等级
    level: number = 0;

    fromJson(json: any) {
        // for (const key in json) {
        //     this[key] = safeJson(json[key]);
        // }
        Object.assign(this, json);
    }
}