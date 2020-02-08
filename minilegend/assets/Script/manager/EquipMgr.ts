import Equip from "../app/item/equip/Equip";

export interface EquipData {
    id: number;
    pos: number;
    inlook: number;
    outlook: number;
    attr: number;
}

class EquipMgr {

    equipList: { [x: number]: EquipData } = {};

    async init() {
        let getRes = (await import("../common/gFunc")).getRes;
        let data = await getRes("/prop_data/prop_equip", cc.JsonAsset);
        let json = data.json;
        this.equipList = json;
    }

    // async init() {
    //     let RootDir = (await import("../common/gFunc")).RootDir;
    //     let data = require(RootDir("../app/prop_data/prop_equip"));
    //     this.equipList = data;
    // }

    getEquipData(equipid: number): EquipData | null {
        return this.equipList[equipid];
    }

    genEquip(equipid: number): Equip | null {
        let equipData = this.getEquipData(equipid);
        if (!equipData) {
            return null;
        }
        let equip = new Equip();
        return equip;
    }

    // genEquip(){

    // }
}

let equipMgr = new EquipMgr();
export default equipMgr;