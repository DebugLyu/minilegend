/**
属性管理器
    用于管理属性配置
    前后端代码 读取配置文件方式不同  其他相同
 */

import { random } from "../common/gFunc";
import { AttrDatas, Attribute, AttrIds } from "../common/G";

class  AttributeMgr {
    attributeList: {[x:string]: AttrDatas} = {};

    async init() {
        let getRes = (await import("../common/gFunc")).getRes;
        let data = await getRes("/prop_data/prop_attribute", cc.JsonAsset);
        let json = data.json;
        this.attributeList = json;
    }

    // async init(){
    //     let RootDir = (await import("../common/gFunc")).RootDir;
    //     let data = require(RootDir("../app/prop_data/prop_attribute"));
    //     this.attributeList = data;
    // }

    public getAttrData(id: number){
        return this.attributeList[id];
    }

    setAttr(attr:Attribute, id: number): Attribute{
        let data:AttrDatas = this.getAttrData(id);
        // let attr = new Attribute();
        // attr.Hp = random(data.Hp1, data.Hp2);
        attr[AttrIds.MaxHp] = random(data.MaxHp1, data.MaxHp2);
        attr[AttrIds.Speed] = random(data.Speed1, data.Speed2);
        attr[AttrIds.AtkSpe] = random(data.AtkSpe1, data.AtkSpe2);
        attr[AttrIds.AtkMin] = random(data.AtkMin1, data.AtkMin2);
        attr[AttrIds.AtkMax] = random(data.AtkMax1, data.AtkMax2);
        attr[AttrIds.Defense] = random(data.Defense1, data.Defense2);
        attr[AttrIds.MatkMin] = random(data.MatkMin1, data.MatkMin2);
        attr[AttrIds.MatkMax] = random(data.MatkMax1, data.MatkMax2);
        attr[AttrIds.Mdefense] = random(data.Mdefense1, data.Mdefense2);
        attr[AttrIds.DatkMin] = random(data.DatkMin1, data.DatkMin2);
        attr[AttrIds.DatkMax] = random(data.DatkMax1, data.DatkMax2);
        attr[AttrIds.Ddefense] = random(data.Ddefense1, data.Ddefense2);
        attr[AttrIds.Hit] = random(data.Hit1, data.Hit2);
        attr[AttrIds.Crit] = random(data.Crit1, data.Crit2);
        attr[AttrIds.CritAdd] = random(data.CritAdd1, data.CritAdd2);
        attr[AttrIds.Dodge] = random(data.Dodge1, data.Dodge2);
        attr[AttrIds.Cut] = random(data.Cut1, data.Cut2);
        attr[AttrIds.CutPre] = random(data.CutPre1, data.CutPre2);
        attr[AttrIds.Poison] = random(data.Poison1, data.Poison2);
        attr[AttrIds.Paralysis] = random(data.Paralysis1, data.Paralysis2);
        attr[AttrIds.Toughness] = random(data.Toughness1, data.Toughness2);
        attr[AttrIds.Lucky] = random(data.Lucky1, data.Lucky2);
        attr[AttrIds.Damnation] = random(data.Damnation1, data.Damnation2);
        return attr;
    }
}

let attributeMgr = new AttributeMgr();
export default attributeMgr;