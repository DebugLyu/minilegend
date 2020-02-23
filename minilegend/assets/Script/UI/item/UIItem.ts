import UIMgr from "../../manager/UIMgr";
import Item from "../../app/item/Item";
import itemMgr, { ItemData } from "../../manager/ItemMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UIItem")
export default class UIItem extends cc.Component {
	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Label)
	numLabel: cc.Label = null;

	itemid: number = 0;
	item: Item = null;

	get num(): number {
		return Number(this.numLabel.string.slice(1));
	}

	set num(n: number) {
		this.numLabel.string = "× " + n;
		this.numLabel.node.active = n > 1;
	}

	start() {
		this.regClickLisner();
	}

	setIcon(sfname: string){
		let sf = itemMgr.getItemSpriteFrame(sfname);
		this.icon.spriteFrame = sf;
	}

	setInfo(item: Item){
		this.itemid = item.itemid;
		this.num = item.num;
		this.item = item;

		let framename = String(item.itemData.icon);
		this.setIcon(framename);
	}

	regClickLisner() {
		this.node.on("click", this.onClick, this);
	}

	onClick() {
		UIMgr.showItemDetail(this.item);
	}
}