import Role from "../../role/Role";
import Stage from "../../app/map/Stage";
import playerMgr from "../../manager/PlayerMgr";
import { AttrIds } from "../../common/G";
import BattleScene from "../../app/map/BattleScene";
import { getRes } from "../../common/gFunc";

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
			this.battleScene.loadStage(10001);
		}, 2000);

		setTimeout(async () => {

		}, 3000);
	}
}