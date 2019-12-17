import MapMgr from "../../manager/MapMgr";

const { ccclass, property, menu} = cc._decorator;

@ccclass
@menu("ui/loading")
export default class Loading extends cc.Component {

	start(){
		MapMgr.getInstance().init();
	}
}