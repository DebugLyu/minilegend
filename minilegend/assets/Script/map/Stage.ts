import StageMgr from "../manager/StageMgr";

const { ccclass, property, menu} = cc._decorator;

@ccclass
@menu("map/stage")
export default class Stage extends cc.Component {
	_nodeArray: cc.Node[][] = [];



	loadMap(mapid: number): void{
		let stagedata = StageMgr.getInstance().getStageData(123);
		stagedata.stageid;
	}
}