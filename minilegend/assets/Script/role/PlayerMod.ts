import WarriorMod from "./WarriorMod";
import { LivingType } from "../common/G";
import PlayerCtr from "./PlayerCtr";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
   
    get control(): PlayerCtr{
        return <PlayerCtr>this._control;
    }

    init(){
        super.init();
        this.livingType = LivingType.PLAYER;
    }

    test(){
        this.control.dead();
    }
}
