import MapMgr, { MapData, StageData } from "../manager/MapMgr";
import { ActState, Cell } from "../common/G";
import Role from "../role/Role";
import { gameMapSpr, gameAnimation } from "../common/gFunc";
import PlayerMgr from "../manager/PlayerMgr";
import EffectLayer from "./EffectLayer";

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
	effectLayer: EffectLayer = null;

	role: Role = null;
	roleList: { [key: number]: Role } = {};

	start() {
		this.role = PlayerMgr.instance.mainRole;

		this.effectLayer = this.node.getChildByName("EffectLayer").getComponent(EffectLayer);

		RootPos = cc.v2(-cc.winSize.width / 2, -cc.winSize.height / 2);
		this.node.setPosition(RootPos);

		this.checkPlayerPos();
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

		for (const onlyid in this.roleList) {
			if (this.roleList.hasOwnProperty(onlyid)) {
				const role = this.roleList[onlyid];
				if (!PlayerMgr.instance.isMainRole(role.model.onlyid)) {
					role.clean(true);
				}
			}
		}
		this.roleList = {};
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
		this.addTransport();
		this.checkMapNode();
	}

	roleEnter(role: Role) {
		role.enterStage(this.mapId, this.stageId);
		this.roleList[role.model.onlyid] = role;
	}

	roleExit(role: number | Role){
		let onlyid = 0;
		if(typeof role === "number"){
			onlyid = role;
		}
		if(role instanceof Role){
			onlyid = role.model.onlyid;
		}
		let r = this.roleList[onlyid ];
		if(r){
			delete this.roleList[onlyid ];
		}
	}
  
	update(dt) {
		if (this.role.warrior.state != ActState.RUN) {
			return;
		}  
		this.checkPlayerPos();
		this.checkMapNode();
	}

	async playEffect(effectid: number,x: number, y: number) {
		let clip = await gameAnimation("effect", effectid);
		if(clip == null){
			return;
		}
		let node = new cc.Node();
		let sprite = node.addComponent(cc.Sprite);
		sprite.trim = false;
		sprite.sizeMode = cc.Sprite.SizeMode.RAW;
		let animation = node.addComponent(cc.Animation);
		clip.name = "eff " + effectid;
		animation.addClip(clip);
		animation.play(clip.name);
		animation.on("finished", () => {
			node.destroy();
		});
		node.parent = this.node;
		node.zIndex = 1;
		node.position = cc.v2(x, y);
	}

	async addTransport() {
		for (let i = 0; i < this.stageData.trancePos.length; i++) {
			const tinfo = this.stageData.trancePos[i];
			let node = new cc.Node();
			let sprite = node.addComponent(cc.Sprite);
			sprite.trim = false;
			sprite.sizeMode = cc.Sprite.SizeMode.RAW;
			let animation = node.addComponent(cc.Animation);
			let tranClip = await gameAnimation("effect", "transport");
			tranClip.name = "" + this.stageData.trancePos[0].tomap;
			tranClip.wrapMode = cc.WrapMode.Loop;
			animation.addClip(tranClip);
			animation.play(tranClip.name);

			node.parent = this.node;
			node.zIndex = 1;
			node.position = MapMgr.girdPos2pixPos(cc.v2(tinfo.x, tinfo.y));
		}
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