import Thing from "./Thing";
import { LivingType } from "../common/G";
import LivingCtr from "./LivingCtr";

export default class LivingMod extends Thing {
    name: string = "";
    // 类型
    livingType: LivingType = LivingType.NOTHING;

    protected _control: LivingCtr = null;

    constructor(control?: LivingCtr){
        super();
        this._control = control;
    }
    
    init() {
        this.livingType = LivingType.OBJECT;
    }
}
