import LEvent from "../../../common/EventListner";
import playerMgr from "../../../manager/PlayerMgr";
import UIItem from "../../item/UIItem";
import { EquipPos, DefaultInLookCloth } from "../../../common/G";
import itemMgr from "../../../manager/ItemMgr";
import Equip from "../../../app/item/equip/Equip";
import { getRes } from "../../../common/gFunc";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/rolelayer")
export default class MainUIRole extends cc.Component {
	@property(cc.Prefab)
	itemnode: cc.Prefab = null;
	@property(cc.Node)
	itemBg: cc.Node = null;

	curEquipNode: { [x: number]: cc.Node } = {};
	itemlist: cc.Node[] = [];

	inLook: {[x: number]:cc.Sprite} = {};

	private events:number[] = [];
	start() {
		this.initNode();
		this.regEventLisner();
		this.updateItems();
		this.updateEquips();
	}

	onDestroy(){
		this.removeEventLisner();
	}

	initNode() {
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
		
		this.inLook[EquipPos.Clothes] = cc.find("RoleBg/NGCloth", this.node).getComponent(cc.Sprite);
		this.inLook[EquipPos.Weapon] = cc.find("RoleBg/NGWeapon", this.node).getComponent(cc.Sprite);
	}

	regEventLisner() {
		this.events.push(LEvent.on("ItemUpdate", this.updateItems, this));
		this.events.push(LEvent.on("EquipUpdate", this.updateEquips, this));
	}

	removeEventLisner() {
		for (const eventid of this.events) {
			LEvent.off("ItemUpdate", eventid);
		}
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
			let equip: Equip = equips[pos];
			if (equip == null) {
				icon.active = false;
			} else {
				icon.active = true;
				let spr = icon.getComponent(cc.Sprite);
				spr.spriteFrame = itemMgr.getItemSpriteFrame(equip.itemData.icon);
			}
		}
		this.updateInLook();
	}

	updateInLook(pos?: EquipPos) {
		let inlook = async (epos) => {
			let equip: Equip = playerMgr.mainData.equips[epos];
			let inlookid = 0;
			if (equip) {
				inlookid = equip.equipData.inlook;
			}else{
				if(epos == EquipPos.Clothes){
					inlookid = DefaultInLookCloth;
				}
			}
			if(inlookid == 0){
				return;
			}

			let list = {
				[EquipPos.Clothes]: "cloth",
				[EquipPos.Weapon]: "weapon",
			}
			let zhui = list[epos];
			this.inLook[epos].spriteFrame = await getRes("inlook/" + zhui + inlookid, cc.SpriteFrame);
		}
		if(pos == null){
			inlook(EquipPos.Clothes);
			inlook(EquipPos.Weapon);
		}else{
			inlook(pos);
		}
	}
}