import WarriorMod from "./WarriorMod";
import { LivingType } from "../common/G";
import PlayerCtr from "./PlayerCtr";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
   

    init(){
        super.init();
        this.livingType = LivingType.PLAYER;
    }

    get control(): PlayerCtr<PlayerMod> {
        return this.control;
    }

    test(){
        this.control.dead();
        
    }
}
