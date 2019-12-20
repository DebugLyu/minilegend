import Role from "../../role/Role";
import MapMgr from "../../manager/MapMgr";
import MonsterMgr from "../../manager/MonsterMgr";
import SkillMgr from "../../manager/SkillMgr";
import ItemMgr from "../../manager/ItemMgr";
import Stage from "../../map/Stage";
import PlayerMgr from "../../manager/PlayerMgr";
import WarriorCtr from "../../role/WarriorCtr";
import MonsterCtr from "../../role/MonsterCtr";
import ObjectMgr from "../../manager/ObjectMgr";

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
		
		setTimeout(() => {
			// if(this.role){
			// 	this.role.enterMap(1001);
			// }
			this.role.weapon.resId = 1700;
			this.stage.loadMap(1001);
			this.stage.roleEnter(this.role);
			ObjectMgr.instance.addObject(this.role);
		}, 2000);

		setTimeout(() => {
			// for(let i = 0; i < 5; i++){
			MonsterMgr.instance.genMonster(1000, this.stage, 10, 7);
			// }

		}, 3000);
	}
}