import WarriorMod from "./WarriorMod";
import { G } from "../common/G";
import PlayerCtr from "./playerCtr";

export default class PlayerMod<T extends PlayerCtr> extends WarriorMod<T> {
    pid: number = 0;// 玩家id

    //resid: number = 0; // 资源id
    weapon: number = 0; // 武器id

    test(){
        this.control.dead();
    }
}
