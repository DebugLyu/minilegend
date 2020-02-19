import UIMgr from "../../manager/UIMgr";
import Item from "../../app/item/Item";
import { ItemType } from "../../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UIItem")
export default class UIItem extends cc.Component {
	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Label)
	numLabel: cc.Label = null;

	@property(cc.SpriteAtlas)
	icons: cc.SpriteAtlas = null;

	itemid: number = 0;

	get num(): number {
		return Number(this.numLabel.string);
	}

	set num(n: number) {
		this.numLabel.string = String(n);
		this.numLabel.node.active = n > 1;
	}

	start() {
		this.regClickLisner();
	}

	setInfo(item: Item){
		this.itemid = item.itemid;
		this.num = item.num;
		let framename = String(item.itemData.icon);
		this.icon.spriteFrame = this.icons.getSpriteFrame(framename);
	}

	regClickLisner() {
		this.node.on("click", this.onClick, this);
	}

	onClick(e, d) {
		UIMgr.showItemDetail(this.itemid);
	}
}