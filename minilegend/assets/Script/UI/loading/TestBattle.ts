import Role from "../../role/Role";
import MapMgr from "../../manager/MapMgr";
import MonsterMgr from "../../manager/MonsterMgr";
import SkillMgr from "../../manager/SkillMgr";

const { ccclass, property, menu} = cc._decorator;

@ccclass
@menu("ui/TestBattle")
export default class TestBattle extends cc.Component {
	@property(Role)
	role: Role = null;

	start(){
		MapMgr.getInstance().init();
		MonsterMgr.getInstance().init();
		SkillMgr.getInstance().init();

		setTimeout(() => {
			if(this.role){
				this.role.enterMap(1001);
			}
		}, 2000);
		
	}
}