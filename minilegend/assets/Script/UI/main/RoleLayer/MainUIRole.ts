import LEvent from "../../../common/EventListner";
import playerMgr from "../../../manager/PlayerMgr";
import Item from "../../../app/item/Item";
import UIItem from "../../item/UIItem";
import Llog from "../../../common/LLog";
import { EquipPos } from "../../../common/G";
import itemMgr from "../../../manager/ItemMgr";
import Equip from "../../../app/item/equip/Equip";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/rolelayer")
export default class MainUIRole extends cc.Component {
	@property(cc.Prefab)
	itemnode: cc.Prefab = null;
	@property(cc.Node)
	itemBg: cc.Node = null;

	curEquipNode: {[x: number]:cc.Node} = {};
	itemlist: cc.Node[] = [];

	start() {
		this.regEventLisner();

		let list = {
			Left: [
				"Weapon",
				"Ring1",
				"Ring2",
			],
			Right: [
				"Necklace",
				"Clothes",
				"Shoes",
			]
		}
		for (const key in list) {
			const dirlist = list[key];
			for (const key2 of dirlist) {
				let node = cc.find("/RoleBg/" + key + "/" + key2, this.node);
				this.curEquipNode[EquipPos[key2]] = node;
			}
		}
		this.updateItems();
		this.updateEquips();
	}

	regEventLisner() {
		LEvent.on("ItemUpdate", this.updateItems, this);
		LEvent.on("EquipUpdate", this.updateEquips, this);
	}

	updateItems() {
		for (const itemnode of this.itemlist) {
			itemnode.destroy();
		}
		this.itemlist = [];

		let items = playerMgr.mainData.items;
		// let classitem = new Item();
		for (const item of items) {
			let itemnode = cc.instantiate(this.itemnode);
			itemnode.parent = this.itemBg;
			let uiitem = itemnode.getComponent(UIItem);
			// classitem.fromJson(item);
			uiitem.setInfo(item);
			this.itemlist.push(itemnode);
		}
	}

	updateEquips() {
		let equips = playerMgr.mainData.equips;

		let list = [
			EquipPos.Weapon, // 武器位置
			EquipPos.Necklace,
			EquipPos.Clothes,
			EquipPos.Ring1,
			EquipPos.Ring2,
			EquipPos.Shoes,
		]
		for (const pos of list) {
			let node: cc.Node = this.curEquipNode[pos];
			let icon = node.getChildByName("icon");
			let equip:Equip = equips[pos];
			if(equip == null){
				icon.active = false;
			}else{
				icon.active = true;
				let spr = icon.getComponent(cc.Sprite);
				spr.spriteFrame = itemMgr.getItemSpriteFrame(equip.itemData.icon);
			}
		}
	}
}