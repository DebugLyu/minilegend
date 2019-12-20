import MapMgr, { MapData, StageData } from "../manager/MapMgr";
import { ActState, Cell } from "../common/G";
import Role from "../role/Role";
import { gameMapSpr } from "../common/gFunc";
import PlayerMgr from "../manager/PlayerMgr";

const { ccclass, property, menu } = cc._decorator;
let RootPos: cc.Vec2 = cc.Vec2.ZERO;
let OutRand = 1;

@ccclass
@menu("map/stage")
export default class Stage extends cc.Component {
	nodeArray: cc.Node[][] = [];
	mapId: number = 0;
	stageId: number = 0;
	mapData: MapData = null;
	stageData: StageData = null;

	role:Role = null;

	start() {
		this.role = PlayerMgr.instance.mainRole;

		RootPos = cc.v2(-cc.winSize.width / 2, -cc.winSize.height / 2);
		this.node.setPosition(RootPos);
		// cc.log(root_pos);

		this.checkPlayerPos();

		// TODO: test map
		// setTimeout(() => {
		// 	this.loadMap(1001);
		// }, 2000);

	}

	clearStage() {
		for (let i = 0; i < this.nodeArray.length; i++) {
			const list = this.nodeArray[i];
			for (let t = 0; t < list.length; t++) {
				const node = list[t];
				if (node != null) {
					node.destroy();
				}
			}
		}
		this.nodeArray = [];
	}

	loadMap(mapid: number): void {
		this.mapId = mapid;
		this.mapData = MapMgr.instance.getMapData(mapid);
		this.loadStage(this.mapData.startStage);
	}

	loadStage(stageid: number) {
		this.clearStage();
		this.stageId = stageid;
		let stagedata = this.mapData.stageList[stageid];
		this.stageData = stagedata;
		this.checkMapNode();
	}

	roleEnter(role: Role){
		role.enterStage(this.mapId, this.stageId);
	}

	update(dt) {
		if (this.role.warrior.state == ActState.IDLE) {
			return;
		}
		this.checkPlayerPos();
		this.checkMapNode();
	}

	checkPlayerPos() {
		let ppos = this.role.node.position;
		let topos = cc.v2(-ppos.x, -ppos.y);
		if (topos.x > RootPos.x) {
			topos.x = RootPos.x;
		}
		if (topos.x < cc.winSize.width - this.node.width + RootPos.x) {
			topos.x = cc.winSize.width - this.node.width + RootPos.x;
		}
		if (topos.y > RootPos.y) {
			topos.y = RootPos.y;
		}
		if (topos.y < cc.winSize.height - this.node.height + RootPos.y) {
			topos.y = cc.winSize.height - this.node.height + RootPos.y;
		}

		this.node.setPosition(topos);
	}

	async checkMapNode() {
		let stagedata = this.stageData;
		let winsize = cc.winSize;

		let max_x = stagedata.width / Cell.width;
		let max_y = stagedata.height / Cell.height;

		let outx1 = - winsize.width - Cell.width * (OutRand - 1 + 0.5);
		let outx2 = winsize.width + Cell.width * (OutRand - 1 + 0.5);
		let outy1 = -winsize.height - Cell.height * (OutRand - 1 + 0.5);
		let outy2 = winsize.height + Cell.height * (OutRand - 1 + 0.5)

		for (let x = 0; x < max_x; x++) {
			if (this.nodeArray[x] == null) {
				this.nodeArray[x] = [];
			}

			for (let y = 0; y < max_y; y++) {
				let posx = x * Cell.width + Cell.width / 2;
				let posy = y * Cell.height + Cell.height / 2;
				let wpos = this.node.convertToWorldSpaceAR(cc.v2(posx, posy));
				if (wpos.x < outx1 || wpos.x > outx2 || wpos.y < outy1 || wpos.y > outy2) {
					// 在外围
					let node = this.nodeArray[x][y];
					if (node) {
						this.nodeArray[x][y] = null;
						node.destroy()
					}
				} else {
					// 在屏幕内
					let node = this.nodeArray[x][y];
					if (node == null) {
						let node = new cc.Node();
						let spr = node.addComponent(cc.Sprite);
						spr.spriteFrame = await gameMapSpr(stagedata.resid, x, y);
						node.setPosition(cc.v2(posx, posy));
						node.parent = this.node;
						node.zIndex = -1;
						this.nodeArray[x][y] = node;
					}
				}
			}
		}
	}
}