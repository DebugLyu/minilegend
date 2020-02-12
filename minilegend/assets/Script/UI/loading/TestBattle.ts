import Role from "../../role/Role";
import Stage from "../../app/map/Stage";
import playerMgr from "../../manager/PlayerMgr";
import { AttrIds } from "../../common/G";
import BattleScene from "../../app/map/BattleScene";
import { getRes } from "../../common/gFunc";
import gameMgr from "../../manager/GameMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/TestBattle")
export default class TestBattle extends cc.Component {
	role: Role = null;
	@property(Stage)
	stage: Stage = null;
	@property(BattleScene)
	battleScene: BattleScene = null;

	onLoad() {
		// await gameMgr.init();
		playerMgr.mainRole = this.role;// addPlayer(this.role);
	}

	start() {

		var manager = cc.director.getCollisionManager();
		manager.enabled = true;
		// manager.enabledDebugDraw = true;
		// manager.enabledDrawBoundingBox = true;
		setTimeout(() => {
			this.battleScene.loadStage(1001);
		}, 2000);

		setTimeout(async () => {
			let playerprefab = await getRes("prefab/role/PlayerRole", cc.Prefab);
			let rolenode = cc.instantiate(playerprefab);
			this.role = rolenode.getComponent(Role);
			this.role.init();
			this.role.weapon.resId = 1700;
			this.role.warrior.resId = 3800;

			playerMgr.mainRole = this.role;

			this.role.model.name = "测试角色";
			this.role.model.attr[AttrIds.Hp] = 50000;
			this.role.model.attr[AttrIds.MaxHp] = 50000;
			this.role.model.attr[AttrIds.Speed] = 240;
			this.role.model.attr[AttrIds.AtkMin] = 1;
			this.role.model.attr[AttrIds.AtkMax] = 100;
			this.role.model.attr[AttrIds.Defense] = 2;
			this.role.model.attr[AttrIds.MatkMin] = 7;
			this.role.model.attr[AttrIds.MatkMax] = 9;
			this.role.model.attr[AttrIds.Mdefense] = 3;
			this.role.model.attr[AttrIds.DatkMin] = 5;
			this.role.model.attr[AttrIds.DatkMax] = 8;
			this.role.model.attr[AttrIds.Ddefense] = 4;

			this.battleScene.roleEnter(this.role);
		}, 3000);
	}
}