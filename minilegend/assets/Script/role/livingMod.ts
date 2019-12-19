import Thing from "./Thing";
import { LivingType } from "../common/G";
import LivingCtr from "./LivingCtr";

export default class LivingMod extends Thing {
    name: string = "";
    // 类型
    livingType: LivingType = LivingType.NOTHING;
    

    get control(): LivingCtr<LivingMod> {
        return this.control;
    }

    init(){
        super.init();
        this.livingType = LivingType.OBJECT;
    }
}
