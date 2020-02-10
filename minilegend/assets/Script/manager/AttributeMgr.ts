/**
属性管理器
    用于管理属性配置
    前后端代码 读取配置文件方式不同  其他相同
 */

import { random, lRandom } from "../common/gFunc";
import { AttrDatas, Attribute, AttrIds, ArtiAttrDatas } from "../common/G";

class AttributeMgr {
    attributeList: { [x: number]: AttrDatas } = {};
    artiattrList: { [x: number]: ArtiAttrDatas } = {};

    async init() {
        let getRes = (await import("../common/gFunc")).getRes;
        let data = await getRes("/prop_data/prop_attribute", cc.JsonAsset);
        let json = data.json;
        this.attributeList = json;
        let artidata = await getRes("prop_data/prop_artiattr", cc.JsonAsset);
        let artijson = artidata.json;
        this.artiattrList = artijson;
    }

    // async init(){
    //     let RootDir = (await import("../common/gFunc")).RootDir;
    //     let data = require(RootDir("../app/prop_data/prop_attribute"));
    //     this.attributeList = data;
    // }

    public getAttrData(id: number) {
        return this.attributeList[id];
    }

    setAttr(attr: Attribute, attrid: number, artiid?: number): Attribute {
        let data: AttrDatas = this.getAttrData(attrid);
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
        if (artiid != null) {
            let atridata = this.artiattrList[artiid];
            if (atridata) {
                attr[AttrIds.Hit] = random(atridata.Hit1, atridata.Hit2);
                attr[AttrIds.Crit] = random(atridata.Crit1, atridata.Crit2);
                attr[AttrIds.CritAdd] = random(atridata.CritAdd1, atridata.CritAdd2);
                attr[AttrIds.Dodge] = random(atridata.Dodge1, atridata.Dodge2);
                attr[AttrIds.Cut] = random(atridata.Cut1, atridata.Cut2);
                attr[AttrIds.CutPre] = random(atridata.CutPre1, atridata.CutPre2);
                attr[AttrIds.Poison] = random(atridata.Poison1, atridata.Poison2);
                attr[AttrIds.Paralysis] = random(atridata.Paralysis1, atridata.Paralysis2);
                attr[AttrIds.Toughness] = random(atridata.Toughness1, atridata.Toughness2);
                attr[AttrIds.Lucky] = random(atridata.Lucky1, atridata.Lucky2);
                attr[AttrIds.Damnation] = random(atridata.Damnation1, atridata.Damnation2);
            }
        }
        return attr;
    }
}

let attributeMgr = new AttributeMgr();
export default attributeMgr;