import thing from "./Thing";
import { G } from "../common/G";
import LivingCtr from "./LivingCtr";

export default class livingMod<T extends LivingCtr> extends thing<T> {
    name: string = "";

    livingType: G.LivingType = G.LivingType.NOTHING;

    private _resid : number = 0;
    public set resId(v : number) {
        this._resid = v;
        this.control.updateAvatar();
    }
    
    public get resId() : number {
        return this._resid;
    }
}
