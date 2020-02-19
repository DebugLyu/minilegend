import LEvent from "../../../common/EventListner";
import playerMgr from "../../../manager/PlayerMgr";
import Item from "../../../app/item/Item";
import UIItem from "../../item/UIItem";
import Llog from "../../../common/LLog";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/rolelayer")
export default class MainUIRole extends cc.Component {
	@property(cc.Prefab)
	itemnode: cc.Prefab = null;
	@property(cc.Node)
	itemBg: cc.Node = null;

	itemlist: cc.Node[] = [];

	start(){
		this.regEventLisner();
		this.updateItems();
	}

	regEventLisner(){
		LEvent.on("ItemUpdate", this.updateItems, this)
	}

	updateItems(){
		Llog.info(this);
		for (const itemnode of this.itemlist) {
			itemnode.destroy();
		}

		let items = playerMgr.mainData.items;
		let classitem = new Item();
		for (const item of items) {
			let itemnode = cc.instantiate(this.itemnode);
			itemnode.parent = this.itemBg;
			let uiitem = itemnode.getComponent(UIItem);
			classitem.fromJson(item);
			uiitem.setInfo(classitem);
			this.itemlist.push(itemnode);
		}
	}

	updateEquips(){

	}
}