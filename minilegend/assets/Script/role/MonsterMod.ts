import WarriorMod from "./WarriorMod";
import MonsterCtr from "./MonsterCtr";
import { LivingType, AttrIds, dropInfo } from "../common/G";
import { MonsterData } from "../manager/MonsterMgr";
import { random } from "../common/gFunc";
import attributeMgr from "../manager/AttributeMgr";
import Skill from "../app/skill/Skill";
import skillMgr from "../manager/SkillMgr";


export default class MonsterMod extends WarriorMod {
    data: MonsterData = null;

    get control(): MonsterCtr {
        return this._control as MonsterCtr;
    }

    private _dropList: dropInfo[] = [];
    public get dropList(): dropInfo[] {
        return this._dropList;
    }

    init() {
        super.init();
        this.livingType = LivingType.MONSTER;
    }

    setMonData(mondata: MonsterData) {
        this.data = mondata;
        // 设置资源id 在场景中表现出来
        this.control.resId = mondata.resid;

        this.name = mondata.name;
        // 设置属性
        attributeMgr.setAttr(this.attr, mondata.attr);
        this.attr[AttrIds.Hp] = this.attr[AttrIds.MaxHp];
        
        let skills = [];
        for (const skillid of mondata.skill) {
            let skill = new Skill();
            let skilldata = skillMgr.getSkillData(skillid);
            if(skilldata == null){
                continue;
            }
            skill.setData(skilldata);
            skills.push(skill);
        }
        this.initSkill(skills);

        this.initDropItem();
    }

    initDropItem() {
        let itemlist = this.data.dropitem;
        let r = random(this.data.dropnum);
        for (let i = 0; i < r; i++) {
            let rand = random(0, 100);
            for (let iteminfo of itemlist) {
                let gailv = iteminfo[0];
                if (rand < gailv) {
                    let itemid = iteminfo[1];
                    let min = iteminfo[2];
                    let max = iteminfo[3];
                    let num = random(min, max);
                    this.dropList.push({itemid: itemid, num: num});
                }
            }
        }
    }

    montest() {
        // this.control.testCtr();
    }
}
