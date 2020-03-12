import { Net } from "../../net/net";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("ui/gm/UIRoleGMLayer")
export default class UIRoleGMLayer extends cc.Component {
    start() {
        let createitem = this.node.getChildByName("createItem");
        let createequip = this.node.getChildByName("createEquip");
        let createequip2 = this.node.getChildByName("createEquip2");
        createitem.on("click", this.createItem, this);
        createequip.on("click", this.createEquip, this);
        createequip2.on("click", this.createequip2, this);
    }

    createItem() {
        // Net.gm.createItem();
    }

    createEquip() {
        Net.gm.createItem(30001, 1);
    }

    createequip2() {
        Net.gm.createItem(30003, 1);
    }
}