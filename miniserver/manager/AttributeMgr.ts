/**
属性管理器
    用于管理属性配置
    前后端代码 读取配置文件方式不同  其他相同
 */

import { getRandomArrayItem, lRandom } from "../common/gFunc";
import { AttrDatas, Attribute, AttrIds, ArtiAttrDatas, AttrArray } from "../common/G";

class AttributeMgr {
    attributeList: { [x: number]: AttrDatas } = {};
    artiattrList: { [x: number]: ArtiAttrDatas } = {};

    // async init() {
    //     let getRes = (await import("../common/gFunc")).getRes;
    //     let data = await getRes("/prop_data/prop_attribute", cc.JsonAsset);
    //     let json = data.json;
    //     this.attributeList = json;
    //     let artidata = await getRes("prop_data/prop_artiattr", cc.JsonAsset);
    //     let artijson = artidata.json;
    //     this.artiattrList = artijson;
    // }

    async init() {
        let RootDir = (await import("../common/gFunc")).RootDir;
        let data = require(RootDir("../app/prop_data/prop_attribute"));
        this.attributeList = data;
        let artidata = require(RootDir("../app/prop_data/prop_artiattr"));
        this.artiattrList = artidata;
    }

    public getAttrData(id: number) {
        return this.attributeList[id];
    }

    setAttr(attr: Attribute, attrid: number): Attribute {
        let data: AttrDatas = this.getAttrData(attrid);
        // let attr = new Attribute();
        // attr.Hp = random(data.Hp1, data.Hp2);
        attr[AttrIds.MaxHp] = lRandom(data.MaxHp1, data.MaxHp2);
        attr[AttrIds.Speed] = lRandom(data.Speed1, data.Speed2);
        attr[AttrIds.AtkSpe] = lRandom(data.AtkSpe1, data.AtkSpe2);
        attr[AttrIds.AtkMin] = lRandom(data.AtkMin1, data.AtkMin2);
        attr[AttrIds.AtkMax] = lRandom(data.AtkMax1, data.AtkMax2);
        attr[AttrIds.Defense] = lRandom(data.Defense1, data.Defense2);
        attr[AttrIds.MatkMin] = lRandom(data.MatkMin1, data.MatkMin2);
        attr[AttrIds.MatkMax] = lRandom(data.MatkMax1, data.MatkMax2);
        attr[AttrIds.Mdefense] = lRandom(data.Mdefense1, data.Mdefense2);
        attr[AttrIds.DatkMin] = lRandom(data.DatkMin1, data.DatkMin2);
        attr[AttrIds.DatkMax] = lRandom(data.DatkMax1, data.DatkMax2);
        attr[AttrIds.Ddefense] = lRandom(data.Ddefense1, data.Ddefense2);

        return attr;
    }
    setArtiAttr(arti: Attribute, artiid: number, num: number) {
        let atridata = this.artiattrList[artiid];
        if (atridata) {
            let list: { id: number, min: number, max: number }[] = [];
            let input = (info: { id: number, min: number, max: number }) => {
                if (info.min > 0) {
                    if (info.max < info.min) {
                        info.max = info.min;
                    }
                    list.push(info);
                }
            }
            input({ id: AttrIds.Hit, min: atridata.Hit1, max: atridata.Hit2 });
            input({ id: AttrIds.Crit, min: atridata.Crit1, max: atridata.Crit2 });
            input({ id: AttrIds.CritAdd, min: atridata.CritAdd1, max: atridata.CritAdd2 });
            input({ id: AttrIds.Dodge, min: atridata.Dodge1, max: atridata.Dodge2 });
            input({ id: AttrIds.Cut, min: atridata.Cut1, max: atridata.Cut2 });
            input({ id: AttrIds.CutPre, min: atridata.CutPre1, max: atridata.CutPre2 });
            input({ id: AttrIds.Poison, min: atridata.Poison1, max: atridata.Poison2 });
            input({ id: AttrIds.Paralysis, min: atridata.Paralysis1, max: atridata.Paralysis2 });
            input({ id: AttrIds.Toughness, min: atridata.Toughness1, max: atridata.Toughness2 });
            input({ id: AttrIds.Lucky, min: atridata.Lucky1, max: atridata.Lucky2 });
            input({ id: AttrIds.Damnation, min: atridata.Damnation1, max: atridata.Damnation2 });

            let n = lRandom(1, num);
            for (let i = 0; i < n; i++) {
                let t = getRandomArrayItem(list);
                arti[t.id as AttrIds] = lRandom(t.min, t.max);
            }
        }
        return arti;
    }
}

let attributeMgr = new AttributeMgr();
export default attributeMgr;