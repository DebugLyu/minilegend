import { setWidget } from "../../common/gFunc";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/MainTop")
export default class MainTop extends cc.Component {
	// 经验条
	expBar: cc.ProgressBar = null;
	// 体力剩余
	powerBar: cc.ProgressBar = null;
	// 元宝
	goldText: cc.Label = null;
	// 银币
	coinText: cc.Label = null;


	onEnable(){
		setWidget(this.node, 468);
	}
} 