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
import { AttrIds } from "../../common/G";

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
			this.role.model.name = "测试角色";
			this.role.model.attr[AttrIds.Hp] = 50000;
			this.role.model.attr[AttrIds.MaxHp] = 50000;
			this.role.model.attr[AttrIds.Speed] = 240;
			this.role.model.attr[AttrIds.AtkMin] = 5;
			this.role.model.attr[AttrIds.AtkMax] = 8;
			this.role.model.attr[AttrIds.Defense] = 2;
			this.role.model.attr[AttrIds.MatkMin] = 7;
			this.role.model.attr[AttrIds.MatkMax] = 9;
			this.role.model.attr[AttrIds.Mdefense] = 3;
			this.role.model.attr[AttrIds.DatkMin] = 5;
			this.role.model.attr[AttrIds.DatkMax] = 8;
			this.role.model.attr[AttrIds.Ddefense] = 4;

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