import Role from "../../role/Role";
import MapMgr from "../../manager/MapMgr";
import MonsterMgr from "../../manager/MonsterMgr";
import SkillMgr from "../../manager/SkillMgr";
import ItemMgr from "../../manager/ItemMgr";
import Stage from "../../map/Stage";
import PlayerMgr from "../../manager/PlayerMgr";
import WarriorCtr from "../../role/WarriorCtr";
import MonsterCtr from "../../role/MonsterCtr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/TestBattle")
export default class TestBattle extends cc.Component {
	@property(Role)
	role: Role = null;

	@property(Stage)
	stage: Stage = null;

	onLoad() {
		MapMgr.instance.init();
		MonsterMgr.instance.init();
		SkillMgr.instance.init();
		ItemMgr.instance.init();

		PlayerMgr.instance.mainRole = this.role;// addPlayer(this.role);
	}
	start() {
		this.role.weapon.resId = 1700;
		setTimeout(() => {
			// if(this.role){
			// 	this.role.enterMap(1001);
			// }
			this.stage.loadMap(1001);
			this.stage.roleEnter(this.role);
		}, 2000);

		setTimeout(() => {
			// for(let i = 0; i < 5; i++){
			let monster = MonsterMgr.instance.genMonster(1000);
			monster.parent = this.stage.node;
			let monsterctr = monster.getComponent(Role);
			// let warrior: WarriorCtr =  monster.getComponent("WarriorCtr");
			monsterctr.x = 10;
			monsterctr.y = 5;
			monsterctr.weapon.resId = 0;

			// }

		}, 3000);
	}
}