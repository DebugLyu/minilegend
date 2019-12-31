import WarriorMod from "./WarriorMod";
import MonsterCtr from "./MonsterCtr";
import { LivingType, AttrIds, dropInfo } from "../common/G";
import { MonsterData } from "../manager/MonsterMgr";
import { random } from "../common/gFunc";


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
        this.control.resId = mondata.ResID;

        this.name = mondata.Name;
        // 设置属性
        this.attr[AttrIds.Hp] = mondata.MaxHp;
        this.attr[AttrIds.MaxHp] = mondata.MaxHp;
        this.attr[AttrIds.Speed] = mondata.Speed;
        this.attr[AttrIds.AtkMin] = mondata.AtkMin;
        this.attr[AttrIds.AtkMax] = mondata.AtkMax;
        this.attr[AttrIds.Defense] = mondata.Defense;
        this.attr[AttrIds.MatkMin] = mondata.MatkMin;
        this.attr[AttrIds.MatkMax] = mondata.MatkMax;
        this.attr[AttrIds.Mdefense] = mondata.Mdefense;
        this.attr[AttrIds.DatkMin] = mondata.DatkMin;
        this.attr[AttrIds.DatkMax] = mondata.DatkMax;
        this.attr[AttrIds.Ddefense] = mondata.Ddefense;
        this.initSkill(mondata.Skills);

        this.initDropItem();
    }

    initDropItem() {
        let itemlist = this.data.Items;
        let r = random(this.data.DropNum);
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
