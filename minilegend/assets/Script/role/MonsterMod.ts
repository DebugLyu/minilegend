import WarriorMod from "./WarriorMod";
import MonsterCtr from "./MonsterCtr";
import { LivingType, AttrIds } from "../common/G";
import { MonsterData } from "../manager/MonsterMgr";

export default class MonsterMod extends WarriorMod {
    data: MonsterData = null;

    get control(): MonsterCtr {
        return this._control as MonsterCtr;
    }

    init(){
        super.init();
        this.livingType = LivingType.MONSTER;
    }
    
    setMonData(mondata:MonsterData){
        this.data = mondata;
        // 设置资源id 在场景中表现出来
        this.control.resId = mondata.ResID;

        // 设置属性
        this.attr[AttrIds.Hp] = mondata.Hp;
        this.attr[AttrIds.MaxHp] = mondata.Hp;
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

    }

    montest(){
        // this.control.testCtr();
    }
}
