import { http } from "../../net/http";
import { Net } from "../../net/net";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/gm/UIRoleGMLayer")
export default class UIRoleGMLayer extends cc.Component {
    start() {
        let createitem = this.node.getChildByName("createItem");
        let createequip = this.node.getChildByName("createEquip");
        createitem.on("click", this.createItem, this);
        createequip.on("click", this.createEquip, this);
    }

    createItem() {
        Net.gm.createItem();
    }

    createEquip() {
        Net.gm.createEquip();
    }
}