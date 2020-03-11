import WarriorMod from "./WarriorMod";
import { LivingType, EquipPos } from "../common/G";
import PlayerCtr from "./playerCtr";
import PlayerData from "../app/role/PlayerData";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
    // maxStage: number = 0;

    get control(): PlayerCtr{
        return this._control as PlayerCtr;
    }

    init(){
        super.init();
        this.livingType = LivingType.PLAYER;
    }

    test(){
        this.control.dead();
    }

    setData(pinfo: PlayerData){
        this.onlyid = pinfo.onlyid;
        this.playerid = pinfo.playerid;
        // 这里是测试用的 资源id
        this.control.resId = 3800;// pinfo.equips[EquipPos.Clothes].equipData.outlook;
        this.attr = pinfo.attr.clone();
        this.name = pinfo.name;
        this.initSkill(pinfo.skills);
    }
}
