import { AttrIds, AttrStrCn, Attribute, AttrArray, ItemType } from "../../common/G";
import UIMgr from "../../manager/UIMgr";
import itemMgr from "../../manager/ItemMgr";
import equipMgr from "../../manager/EquipMgr";
import attributeMgr from "../../manager/AttributeMgr";
import Equip from "../../app/item/equip/Equip";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UIEquipDetail")
export default class UIEquipDetail extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    baseAttrNode: cc.Node = null;

    @property(cc.Node)
    artiAttrNode: cc.Node = null;

    @property(cc.Node)
    noneArtiNode: cc.Node = null;

    @property(cc.Node)
    btn1: cc.Node = null;

    @property(cc.Node)
    btn2: cc.Node = null;



    itemid: number = 0;
    type: ItemType = ItemType.Equip;

    get itemName(): string {
        return this.nameLabel ? this.nameLabel.string : "";
    }

    set itemName(n: string) {
        this.nameLabel && (this.nameLabel.string = n);
    }

    start() {
        // this.type = 0;
        let close = cc.find("infobg/close", this.node);
        close.on("click", () => {
            UIMgr.hideUI(this.node);
        });
    }

    setAttr(itemid: number, equip?: Equip) {
        let itemdata = itemMgr.getItemData(itemid);
        if (!itemdata) {
            return;
        }
        // 显示基础信息
        this.type = itemdata.type;
        this.itemid = itemid;
        this.itemName = itemdata.name;
        // 判断是否有属性存在
        if (equip == null){
            // 没有属性 则显示 配置表常规属性
            let equipdata = equipMgr.getEquipData(itemdata.kind);
            if (!equipdata) {
                return;
            }
            let attrdata = attributeMgr.getAttrData(equipdata.attr);
            if (!attrdata){
                return;
            }
            // 先添加基础属性
            if (attrdata.AtkMin1 != 0 || attrdata.AtkMin2 != 0
                || attrdata.AtkMax1 != 0 || attrdata.AtkMax2 != 0){
                this.addBaseAttr(AttrIds.AtkMin, attrdata.AtkMin1, attrdata.AtkMax2);
            }
            if (attrdata.MatkMin1 != 0 || attrdata.MatkMin2 != 0
                || attrdata.MatkMax1 != 0 || attrdata.MatkMax2 != 0) {
                this.addBaseAttr(AttrIds.MatkMin, attrdata.MatkMin1, attrdata.MatkMax2);
            } 
            if (attrdata.DatkMin1 != 0 || attrdata.DatkMin2 != 0
                || attrdata.DatkMax1 != 0 || attrdata.DatkMax2 != 0) {
                this.addBaseAttr(AttrIds.DatkMin, attrdata.DatkMin1, attrdata.DatkMax2);
            }
            if (attrdata.Defense1 != 0 || attrdata.Defense2 != 0) {
                this.addBaseAttr(AttrIds.Defense, attrdata.Defense1, attrdata.Defense2);
            }
            if (attrdata.Mdefense1 != 0 || attrdata.Mdefense2 != 0) {
                this.addBaseAttr(AttrIds.Mdefense, attrdata.Mdefense1, attrdata.Mdefense2);
            }
            if (attrdata.Ddefense1 != 0 || attrdata.Ddefense2 != 0) {
                this.addBaseAttr(AttrIds.Ddefense, attrdata.Ddefense1, attrdata.Ddefense2);
            }
            let label = this.noneArtiNode.getComponent(cc.Label);
            label.string = "随机生成";
            this.btn1 && (this.btn1.active = false);
            if(this.btn2){
                let btnlabel = this.btn2.getChildByName("L1").getComponent(cc.Label);
                btnlabel.string = "锻造";
                this.btn2.on("click", () => {
                    // 打开锻造界面
                });
            }
        }else{
            // 有属性 显示装备属性
            for (const key of AttrArray) {
                let value = equip.getAttr(key);
                if (value == 0 || key == AttrIds.AtkMax ||
                    key == AttrIds.MatkMax || key == AttrIds.DatkMax) {
                    continue;
                }
                if (key < AttrIds.Hit) {
                    let tmp = {
                        [AttrIds.Defense]: AttrIds.Defense,
                        [AttrIds.Mdefense]: AttrIds.Mdefense,
                        [AttrIds.Ddefense]: AttrIds.Ddefense,
                        [AttrIds.AtkMin]: AttrIds.AtkMax,
                        [AttrIds.MatkMin]: AttrIds.MatkMin,
                        [AttrIds.DatkMin]: AttrIds.DatkMin,
                    }
                    if (tmp[key] != null) {
                        let value2 = equip.getAttr[tmp[key]];
                        this.addBaseAttr(key, value, value2);
                    } else {
                        this.addBaseAttr(key, value);
                    }
                } else {
                    value = equip.getArtiAttr(key);
                    this.addArtiAttr(key, value);
                }
            }
        }
        
    }

    addBaseAttr(attrid: AttrIds, num: number, num2?: number) {
        if (attrid == AttrIds.AtkMin || attrid == AttrIds.AtkMax
            || attrid == AttrIds.MatkMin || attrid == AttrIds.MatkMax
            || attrid == AttrIds.DatkMin || attrid == AttrIds.DatkMax) {
            if (num2 == null) {
                num2 = num;
            }
        }
        // let str = `${AttrStrCn[attrid]}: ${num} ~ ${num2}`;
        let nnode = cc.instantiate(this.baseAttrNode);
        nnode.active = true;
        let namelbl = cc.find("attrnum/attr", nnode).getComponent(cc.Label);
        namelbl.string = AttrStrCn[attrid];
        let numlbl = cc.find("attrnum/num", nnode).getComponent(cc.Label);
        numlbl.string = num + "" + (num2 ? (" ~ " + num2) : "");
        nnode.parent = this.baseAttrNode.parent;
    }

    addArtiAttr(attrid: AttrIds, num: number) {
        if (this.noneArtiNode.active) {
            this.noneArtiNode.active = false;
        }
        let nnode = cc.instantiate(this.artiAttrNode);
        nnode.active = true;
        let namelbl = cc.find("attrnum/attr", nnode).getComponent(cc.Label);
        namelbl.string = AttrStrCn[attrid];
        let numlbl = cc.find("attrnum/num", nnode).getComponent(cc.Label);
        numlbl.string = String(num);
        nnode.parent = this.artiAttrNode.parent;
    }


}