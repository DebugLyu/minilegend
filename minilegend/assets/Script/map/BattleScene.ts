/**
 * 战斗相关
 * 		控制战斗的  怪物波次、场景切换等
 */


import { getPrefab } from "../common/gFunc";
import Stage from "./Stage";
import MapMgr, { MapData, StageData } from "../manager/MapMgr";
import Role from "../role/Role";
import { LivingType } from "../common/G";
import MonsterMgr from "../manager/MonsterMgr";
import PlayerMgr from "../manager/PlayerMgr";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("map/battle_scene")
export default class BattleScene extends cc.Component {
	stage: Stage = null;
	endBattle: cc.Prefab = null;

	// 副本数据
	mapData: MapData = null;
	stageData: StageData = null;
	mapId: number = 0;
	stageId: number = 0;
	get isBossStage(): boolean {
		return this.stageData.boss;
	}
	role:Role = null;
	roleLayer:cc.Node = null;
	// 角色列表
	roleList: { [key: number]: Role } = {};
	// 关卡 怪物波次
	wave: number = 0;
	// 当前关卡是否完成
	get isFinish(): boolean {
		if(!this.stageData){
			return false;
		}
		return this.wave == this.stageData.monster.length && this.wave == this.stageData.monster.length;
	}

	start() {
		this.stage = cc.find("Canvas/StageLayer").getComponent(Stage);
		this.roleLayer = this.stage.node.getChildByName("RoleLayer");
		cc.game.on("RoleDie", this.onRoleDie, this);
		this.init();
        cc.game.on("MainRole", this.setMainRole, this);
    }

    setMainRole(role:Role){
        this.role = role;
    }

	async init(){
		this.endBattle = await getPrefab("battle/EndBattle");
	}

    loadMap(mapid: number): void {
        this.mapId = mapid;
		this.mapData = MapMgr.instance.getMapData(mapid);
		this.loadStage(this.mapData.startStage)
	}
	
	loadStage(stageid){
		this.stageId = stageid;
        this.stageData = this.mapData.stageList[stageid];
		this.stage.changeStage(this.stageData);
		this.wave = 0;
		this.checkWave();
		if(this.role){
			// 重置主角色的位置，拉回起始点
            this.role.x = -1;
            this.role.y = -1;

			this.roleEnter(this.role);
		}
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

	nextWave() {
		let monsterlist = this.stageData.monster[this.wave - 1];
		for (const moninfo of monsterlist) {
			MonsterMgr.instance.genMonster(moninfo.monid, this, moninfo.x, moninfo.y);
		}
	}

	checkWave() {
		if (this.getMonsterNum() > 0) {
			return;
		}
		if (this.wave == this.stageData.monster.length) {
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

	onRoleDie(role: Role) {
		this.stage.effectLayer.delRoleEx(role.model.onlyid);
		this.roleExit(role);
		if (role.model.livingType == LivingType.MONSTER) {
			this.checkWave();
		}
	}

	onMissionComplete() {
		let endBattle = cc.instantiate(this.endBattle);
		endBattle.parent = this.node;
	}

	update(){
		this.checkTransport();
	}
	
	checkTransport() {
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