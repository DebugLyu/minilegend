import Warrior from "./Warrior";
import { G } from "../common/G";

export default class playerMod extends Warrior {
    pid: number = 0;// 玩家id

    //resid: number = 0; // 资源id
    weapon: number = 0; // 武器id

    /**
     *
     */
    constructor(control?: cc.Component) {
        super(control);
        this.livingType = G.LivingType.PLAYER;
    }
}
