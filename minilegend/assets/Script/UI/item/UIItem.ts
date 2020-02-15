import UIMgr from "../../manager/UIMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UIItem")
export default class UIItem extends cc.Component {
	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Label)
	numLabel: cc.Label = null;

	itemid: number = 0;

	get num(): number {
		return Number(this.numLabel.string);
	}

	set num(n: number) {
		this.numLabel.string = String(n);
	}

	start() {
		this.regClickLisner();
	}

	regClickLisner() {
		this.node.on("click", this.onClick, this);
	}

	onClick(e, d) {
		UIMgr.showItemDetail(this.itemid);
	}
}