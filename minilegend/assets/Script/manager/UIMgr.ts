import { getRes } from "../common/gFunc";
import UIItemDetail from "../UI/item/UIEquipDetail";
import { Attribute, ItemType } from "../common/G";
import itemMgr from "./ItemMgr";
import Item from "../app/item/Item";
import Equip from "../app/item/equip/Equip";
import UIEquipDetail from "../UI/item/UIEquipDetail";

interface MsgboxInfo {
    msg: string;
    ok?: () => void;
    cancel?: () => void;
    timeout?: number;
}

class __UIMgr {
    nodeList: cc.Node[] = [];

    private prefabList: { [x: string]: cc.Prefab } = {};

    async init() {
        // 通用背景框
        let nodebg = await getRes("prefab/common/NodeBg", cc.Prefab);
        this.prefabList["nodebg"] = nodebg;

        // 通用提示框
        let msgbox = await getRes("prefab/common/MsgBox", cc.Prefab);
        this.prefabList["msgbox"] = msgbox;

        // 通用通知
        let notice = await getRes("prefab/common/Notice", cc.Prefab);
        this.prefabList["notice"] = notice;
    }

    msgBox(type: number = 0, info: MsgboxInfo) {
        let msg = info.msg;
        if (msg == null) {
            return;
        }
        let bg = cc.instantiate(this.prefabList["nodebg"]);
        let t = cc.instantiate(this.prefabList["msgbox"]);
        let UIMsgBox = t.getComponent("UIMsgBox");
        UIMsgBox.showBox(msg, type, info.ok, info.cancel);
        t.parent = bg;
        bg.parent = cc.director.getScene();
        this.nodeList.push(t);

        if (info.timeout != null) {
            setTimeout(() => {
                if (info.ok) {
                    info.ok();
                }
                t.destroy();
            }, info.timeout * 1000);
        }
        cc.tween(t).set({ scale: 0.1 })
            .to(0.3, { scale: 1 }, { easing: 'sineOutIn' })
            .start();
    }

    notice(msg: string) {
        let notice = cc.instantiate(this.prefabList["notice"]);
        notice.parent = cc.director.getScene();
        let size = cc.winSize;
        notice.x = size.width / 2;
        notice.y = size.height / 2;

        let t = notice.getComponent("UINotice")
        t.tips = msg;

        cc.tween(notice).set({ scale: 2, opacity: 0 })
            .to(0.3, { scale: 1, opacity: 255 })
            .delay(2)
            .by(1, { position: cc.v2(0, 200) })
            .by(0.5, { position: cc.v2(0, 100), opacity: -255 })
            .start();
    }

    showItemDetail(item: Item);
    showItemDetail(itemid: number);
    showItemDetail(item: number | Item) {
        if (typeof item == "number") {
            let itemdata = itemMgr.getItemData(item);
            if (itemdata.type == ItemType.Equip) {
                this.showUI("prefab/item/EquipDetail").then((equipDetail) => {
                    let detail = equipDetail.getComponent(UIEquipDetail);
                    detail.setAttr(item);
                });
            }
        } else {
            if(item instanceof Equip){
                this.showUI("prefab/item/EquipDetail").then((equipDetail) => {
                    let detail = equipDetail.getComponent(UIEquipDetail);
                    detail.setAttr(item.itemid, item);
                });
            }
        }
    }

    closeItemDetail() {
        this.hideUI();
    }

    async showUI(path: string) {
        if (this.prefabList[path] == null) {
            this.prefabList[path] = await getRes(path, cc.Prefab);
        }

        let bg = cc.instantiate(this.prefabList["nodebg"]);
        let node = cc.instantiate(this.prefabList[path]);
        node.parent = bg;
        node.x = node.y = 0;
        node.name = "bgnode";
        bg.parent = cc.director.getScene();
        this.nodeList.push(node);

        cc.tween(node)
            .set({ scale: 0.2 })
            .to(0.5, { scale: 1 }, { easing: 'backOut' })
            .start();

        return node;
    }

    /**
     * 关闭UI
     * @param node 子节点 或 节点名字 或 null（当前最上层节点）
     */
    hideUI(nodeOrStrOrNul?: cc.Node | string) {
        let node: cc.Node = null;
        if (typeof nodeOrStrOrNul == "string") {
            for (const n of this.nodeList) {
                if (n.name == nodeOrStrOrNul) {
                    node = n;
                }
            }
        } else if (nodeOrStrOrNul instanceof cc.Node) {
            node = nodeOrStrOrNul;
        } else if (nodeOrStrOrNul == null) {
            node = this.nodeList[this.nodeList.length - 1];
        }
        if (node == null) {
            return;
        }
        cc.tween(node)
            .to(0.5, { scale: 0.2 }, { easing: "backIn" })
            .call(() => {
                node.parent.destroy();
            })
            .start();
    }
}
let UIMgr = new __UIMgr();
export default UIMgr;