import Thing from "./Thing";
import { LivingType } from "../common/G";
import LivingCtr from "./LivingCtr";

export default class LivingMod extends Thing {
    name: string = "";
    // 类型
    livingType: LivingType = LivingType.NOTHING;

    protected _control: LivingCtr = null;

    param: any = null;

    constructor(control?: LivingCtr){
        super();
        this._control = control;
        // this.init();
    }
    
    init() {
        this.livingType = LivingType.OBJECT;
    }

    isMonster() {
        return this.livingType == LivingType.MONSTER;
    }

    isNpc() {
        return this.livingType == LivingType.NPC;
    }

    isPlayer(){
        return this.livingType == LivingType.PLAYER;
    }
}
