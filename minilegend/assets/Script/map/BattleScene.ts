/**
 * 战斗相关
 * 		控制战斗的  怪物波次、场景切换等
 */


import { getPrefab, getItemAtlas, toChineseNum } from "../common/gFunc";
import Stage from "./Stage";
import MapMgr, { MapData, StageData } from "../manager/MapMgr";
import Role from "../role/Role";
import { LivingType, dropInfo } from "../common/G";
import MonsterMgr from "../manager/MonsterMgr";
import PlayerMgr from "../manager/PlayerMgr";
import EndBattle from "./EndBattle";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("map/battle_scene")
export default class BattleScene extends cc.Component {
	stage: Stage = null;
	private endBattle: cc.Prefab = null;

	// 副本数据
	mapData: MapData = null;
	stageData: StageData = null;
	private mapId: number = 0;
	private stageId: number = 0;
	private get isBossStage(): boolean {
		return this.stageData.boss;
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
		if (!this.stageData) {
			return false;
		}
		return this.wave == this.stageData.monster.length && this.wave == this.stageData.monster.length;
	}

	start() {
		this.stage = cc.find("Canvas/StageLayer").getComponent(Stage);
		this.roleLayer = this.stage.node.getChildByName("RoleLayer");
		this.waveNode = this.node.getChildByName("wave");
		cc.game.on("RoleDie", this.onRoleDie, this);
		this.init();
		cc.game.on("MainRole", this.setMainRole, this);
	}

	setMainRole(role: Role) {
		this.role = role;
	}

	async init() {
		this.endBattle = await getPrefab("battle/EndBattle");
	}

	loadMap(mapid: number): void {
		this.mapId = mapid;
		this.mapData = MapMgr.instance.getMapData(mapid);
		this.loadStage(this.mapData.startStage)
	}

	private loadStage(stageid) {
		this.stageId = stageid;
		this.stageData = this.mapData.stageList[stageid];
		this.stage.changeStage(this.stageData);
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
		this.waveNode.runAction(cc.scaleTo(0.2, 1, 1));
		let label = labelnode.getComponent(cc.Label);
		label.string = "第" + toChineseNum(this.wave + 1) + "波";
		labelnode.runAction(cc.sequence(
			cc.delayTime(0.3),
			cc.scaleTo(0.2, 1),
			cc.delayTime(1),
			cc.scaleTo(0.2, 1, 0.2),
			cc.callFunc(() => {
				this.waveNode.runAction(cc.scaleTo(0.2, 1, 0));
			})
		));
	}

	getMonsterNum(): number {
		let n = 0;
		for (const onlyid in this.roleList) {
			if (this.roleList.hasOwnProperty(onlyid)) {
				const role = this.roleList[onlyid];
				if (role.model.livingType == LivingType.MONSTER) {
					n++;
				}
			}
		}
		return n;
	}

	private nextWave() {
		let monsterlist = this.stageData.monster[this.wave - 1];
		for (const moninfo of monsterlist) {
			MonsterMgr.instance.genMonster(moninfo.monid, this, moninfo.x, moninfo.y);
		}
	}

	private checkWave() {
		if (this.getMonsterNum() > 0) {
			return;
		}
		if (this.wave == this.stageData.monster.length) {
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
		role.enterStage(this.mapId, this.stageId);
		this.roleList[role.model.onlyid] = role;

		if (PlayerMgr.instance.isMainRole(role.model.onlyid)) {
			role.x = this.stageData.startPos.x;
			role.y = this.stageData.startPos.y;
		}

		role.node.parent = this.roleLayer;
	}

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
		this.stage.effectLayer.delRoleEx(role.model.onlyid);
		this.roleExit(role);
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
			let mainrole = PlayerMgr.instance.mainRole;
			for (const _ in this.stageData.trancePos) {
				let trpos = this.stageData.trancePos[_];
				let trrect = cc.rect(trpos.x - 1, trpos.y - 1, 3, 5);
				if (trrect.contains(cc.v2(mainrole.x, mainrole.y))) {
					this.loadStage(Number(trpos.tomap));
					return;
				}
			}
		}
	}
}