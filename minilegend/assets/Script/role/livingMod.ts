import Thing from "./Thing";
import { LivingType } from "../common/G";
import LivingCtr from "./LivingCtr";

export default class LivingMod extends Thing {
    name: string = "";

    livingType: LivingType = LivingType.NOTHING;

    private _resid : number = 0;

    get control(): LivingCtr<LivingMod> {
        return this._control;
    }

    init(){
        super.init();
        this.livingType = LivingType.OBJECT;
    }

    public set resId(v : number) {
        this._resid = v;
        this.control.updateAvatar();
    }
    
    public get resId() : number {
        return this._resid;
    }
}
