import StageMgr from "../manager/MapMgr";
import PlayerCtr from "../role/playerCtr";
import PlayerMod from "../role/PlayerMod";
import { ActState } from "../common/G";

const { ccclass, property, menu} = cc._decorator;
let root_pos:cc.Vec2 = null;

@ccclass
@menu("map/stage")
export default class Stage extends cc.Component {
	_nodeArray: cc.Node[][] = [];

	@property(PlayerCtr)
	player: PlayerCtr<PlayerMod> = null;


	start(){
		root_pos = cc.v2(-cc.winSize.width/ 2, -cc.winSize.height/2);
		this.node.setPosition(root_pos);
		cc.log(root_pos);
	}

	loadMap(mapid: number): void{
		let mapdata = StageMgr.getInstance().getMapData(mapid);
		let stagedata = mapdata.getStageData(mapdata.startStage);

	}

	update(dt){
		// if(this.player.state == ActState.IDLE){
		// 	return;
		// }
		// this.checkPlayerPos();
	}

	checkPlayerPos(){
		let ppos = this.player.node.position;

		// let worldpos = this.node.convertToWorldSpaceAR(ppos);
		// let topos = cc.v2(-worldpos.x, -worldpos.y);
		
		// 人物目标点
		let r_pos = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
		let topos = cc.v2(-ppos.x, -ppos.y);
		if(topos.x > root_pos.x){
			topos.x = root_pos.x;
		}
		if(topos.x < cc.winSize.width - this.node.width + root_pos.x){
			topos.x = cc.winSize.width - this.node.width + root_pos.x;
		}
		if(topos.y > root_pos.y){
			topos.y = root_pos.y;
		}
		if(topos.y < cc.winSize.height - this.node.height + root_pos.y){
			topos.y = cc.winSize.height - this.node.height  + root_pos.y;
		}


		this.node.setPosition(topos);
		console.log(this.node.position);
	}


}