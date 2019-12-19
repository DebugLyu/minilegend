import MapMgr from "../../manager/MapMgr";
import MonsterMgr from "../../manager/MonsterMgr";
import SkillMgr from "../../manager/SkillMgr";
import Role from "../../role/Role";

const { ccclass, property, menu} = cc._decorator;

@ccclass
@menu("ui/Test")
export default class Test extends cc.Component {
	@property(Role)
	player: Role = null;

	start(){
		MapMgr.getInstance().init();
		MonsterMgr.getInstance().init();
		SkillMgr.getInstance().init();

		setTimeout(() => {
			if(this.player){
				this.player.role.enterMap(1001);
			}
		}, 2000);
		
	}
}