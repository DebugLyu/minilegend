import WarriorMod from "./WarriorMod";
import { LivingType } from "../../common/G";
import PlayerCtr from "./playerCtr";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
   
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
}
