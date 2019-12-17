import WarriorMod from "./WarriorMod";
import { LivingType } from "../common/G";
import PlayerCtr from "./playerCtr";

export default class PlayerMod extends WarriorMod {
    pid: number = 0;// 玩家id

    //resid: number = 0; // 资源id
    weapon: number = 0; // 武器id

    init(){
        super.init();
        this.livingType = LivingType.PLAYER;
    }

    get control(): PlayerCtr<PlayerMod> {
        return this._control;
    }

    test(){
        this.control.dead();
        
    }
}
