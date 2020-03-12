/**
 * 战斗相关
 * 		控制战斗的  怪物波次、场景切换等
 */


import { toChineseNum, getRes } from "../../common/gFunc";
import Stage from "./Stage";
import MapMgr, { MapData, PlatData } from "../../manager/MapMgr";
import Role from "../../role/Role";
import { LivingType, dropInfo } from "../../common/G";
import MonsterMgr from "../../manager/MonsterMgr";
import playerMgr from "../../manager/PlayerMgr";
import EndBattle from "./EndBattle";
import mapMgr from "../../manager/MapMgr";
import LEvent from "../../common/EventListner";
import PlayerCtr from "../../role/playerCtr";

const { ccclass, menu } = cc._decorator;
@ccclass
@menu("map/battle_scene")
export default class BattleScene extends cc.Component {
	stage: Stage = null;
	private endBattle: cc.Prefab = null;

	// 副本数据
	private mapId: number = 0;
	private stageId: number = 0;
	private platId: number = 0;
	mapData: MapData = null;
	platData: PlatData = null;
	private get isBossStage(): boolean {
		return this.platData.boss;
	}
	
	private role: Role = null;
	roleLayer: cc.Node = null;
	// 角色列表
	roleList: { [key: number]: Role } = {};
	// 掉落物品列表
	private dropItemList: { [key: number]: number } = {}; // 掉落总记录
	private dropItemTemp: { [key: number]: number } = {}; // 当前场景掉落 
	// 关卡 怪物波次
	private wave: number = 0;
	private waveNode: cc.Node = null;
	// 当前关卡是否完成
	get isFinish(): boolean {
		if (!this.platData) {
			return false;
		}
		return this.wave == this.platData.monster.length && this.wave == this.platData.monster.length;
	}

	start() {
		var manager = cc.director.getCollisionManager();
		manager.enabled = true;

		this.stage = cc.find("Canvas/StageLayer").getComponent(Stage);
		this.roleLayer = this.stage.node.getChildByName("RoleLayer");
		this.waveNode = this.node.getChildByName("wave");

		this.scheduleOnce(this.loadGameRes, 1);
	}

	async loadGameRes(){
		this.endBattle = await getRes("/prefab/battle/EndBattle", cc.Prefab);

		let playerprefab = await getRes("prefab/role/PlayerRole", cc.Prefab);
		let rolenode = cc.instantiate(playerprefab);
		this.role = rolenode.getComponent(Role);
		this.role.init();
		let playerctr = rolenode.getChildByName("rolectr").getComponent(PlayerCtr);
		playerctr.model.setData(playerMgr.mainData);
		
		playerMgr.mainRole = this.role;
		

		LEvent.on("RoleDie", this.onRoleDie, this);
		this.loadStage(playerMgr.mainData.lastStage);

		setTimeout(() => {
			this.allLoaded();
		}, 3 * 1000);
	}

	destroyGameRes(){

	}

	allLoaded(){
		this.battleStart();
	}

	battleStart() {
		this.roleEnter(this.role);
		LEvent.emit("MainRole", this.role);
	}


	loadStage(stageid: number): void {
		this.stageId = stageid;
		let stagedata = MapMgr.getStageData(stageid);
		this.loadPlat(stagedata.plat);
	}

	private async loadPlat(platid: number) {
		this.platId = platid;
		this.platData = await mapMgr.getPlatData(platid);
		this.stage.changePlat(this.platData);
		this.wave = 0;
		this.checkWave();
		if (this.role) {
			// 重置主角色的位置，拉回起始点
			this.role.x = -1;
			this.role.y = -1;

			this.roleEnter(this.role);
		}
	}

	showWave() {
		let labelnode = this.waveNode.getChildByName("label");
		labelnode.scaleY = 0;
		this.waveNode.scaleY = 0;
		cc.tween(this.waveNode)
			.to(0.2, {scale: 1})
			.start();
		let label = labelnode.getComponent(cc.Label);
		label.string = "第" + toChineseNum(this.wave + 1) + "波";
		cc.tween(labelnode).delay(0.3)
			.to(0.2, {scale: 1})
			.delay(1)
			.to(0.2, {scaleY: 0.2})
			.call(() => {
				cc.tween(this.waveNode).to(0.2, {scaleY: 0}).start();
				// this.waveNode.runAction(cc.scaleTo(0.2, 1, 0));
			})
			.start();
	}

	getMonsterNum(): number {
		let n = 0;
		for (const onlyid in this.roleList) {
			if (this.roleList.hasOwnProperty(onlyid)) {
				const role = this.roleList[onlyid];
				if (role.model.isDead == false && role.model.livingType == LivingType.MONSTER) {
					n++;
				}
			}
		}
		return n;
	}

	private nextWave() {
		let monsterlist = this.platData.monster[this.wave - 1];
		for (const moninfo of monsterlist) {
			MonsterMgr.genMonster(moninfo.monid, this, moninfo.x, moninfo.y);
		}
	}

	private checkWave() {
		if (this.getMonsterNum() > 0) {
			return;
		}
		if (this.wave == this.platData.monster.length) {
			// 当前关卡完毕 获得物品
			this.addDropItem();
			setTimeout(() => {
				this.stage.flyDropItem();
			}, 3 * 1000);
			// 是否通关
			if (this.isBossStage) {
				// TODO 过关
				this.onMissionComplete();
				return;
			}
			this.stage.addTransport();
			return;
		}
		setTimeout(() => {
			this.showWave();
		}, 1.5 * 1000);
		setTimeout(() => {
			this.wave++;
			this.nextWave();
		}, 3 * 1000);
	}

	roleEnter(role: Role) {
		role.enterPlat(this.platId, this.mapId, this.stageId);
		this.roleList[role.model.onlyid] = role;

		if (playerMgr.isMainRole(role.model.onlyid)) {
			role.x = this.platData.startPos.x;
			role.y = this.platData.startPos.y;
		}

		role.node.parent = this.roleLayer;
	}

	roleExit(role: Role);
	roleExit(role: number);
	roleExit(role: number | Role) {
		let onlyid = 0;
		if (typeof role === "number") {
			onlyid = role;
		}
		if (role instanceof Role) {
			onlyid = role.model.onlyid;
		}
		let r = this.roleList[onlyid];
		if (r) {
			delete this.roleList[onlyid];
		}
	}

	dropItem(itemlist: dropInfo[], gridpos: cc.Vec2) {
		for (const iteminfo of itemlist) {
			if (this.dropItemTemp[iteminfo.itemid] == null) {
				this.dropItemTemp[iteminfo.itemid] = 0;
			}
			this.dropItemTemp[iteminfo.itemid] += iteminfo.num;
		}
		this.stage.dropItem(itemlist, gridpos);
	}

	private addDropItem() {
		for (const itemid in this.dropItemTemp) {
			if (this.dropItemTemp.hasOwnProperty(itemid)) {
				const num = this.dropItemTemp[itemid];
				if (this.dropItemList[itemid] == null) {
					this.dropItemList[itemid] = 0;
				}
				this.dropItemList[itemid] += num;
			}
		}
	}

	onRoleDie(role: Role) {
		if (role.model.livingType == LivingType.MONSTER) {
			this.checkWave();
		}
	}

	private onMissionComplete() {
		let endBattle = cc.instantiate(this.endBattle);
		endBattle.parent = this.node;
		let endbtl = endBattle.getComponent(EndBattle);
		endbtl.addItemList(this.dropItemList);
	}

	update() {
		this.checkTransport();
	}

	private checkTransport() {
		if (this.isFinish) {
			let mainrole = playerMgr.mainRole;
			for (const _ in this.platData.trancePos) {
				let trpos = this.platData.trancePos[_];
				let trrect = cc.rect(trpos.x - 1, trpos.y - 1, 3, 5);
				if (trrect.contains(cc.v2(mainrole.x, mainrole.y))) {
					this.loadPlat(Number(trpos.tomap));
					return;
				}
			}
		}
	}
}