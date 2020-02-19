import { ItemType } from "../../common/G";
import UIMgr from "../../manager/UIMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UIIItemDetail")
export default class UIIItemDetail extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    explainLabel: cc.Label = null;

    @property(cc.Node)
    psNode: cc.Node = null;

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

    get explain() {
        return this.explainLabel ? this.explainLabel.string : "";
    }

    set explain(n: string) {
        this.explainLabel && (this.explainLabel.string = n);
    }

    start() {
        // this.type = 0;
        let close = cc.find("infobg/close", this.node);
        close.on("click", () => {
            UIMgr.hideUI(this.node);
        });
    }

    addps(s: string){
        let t = cc.instantiate(this.psNode); 
        t.active = true;
        t.parent = this.psNode.parent;
        let l = t.getComponent(cc.Label);
        l.string = s;
    }
}