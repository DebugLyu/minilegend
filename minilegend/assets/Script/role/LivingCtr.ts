import { roleAnimation } from "../common/gFunc";
import livingMod from "./livingMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")
export default class LivingCtr extends cc.Component {
    @property(cc.Label)
    roleName: cc.Label = null;
    
    public _model: any = null;
    private _lastDir : number = 2;
    private _lastAct : string = "idle";

    start(){
        this.runAction();
    }

    async runAction(dir:number = 2, act: string = "idle") {
        if(this._lastAct == act && this._lastDir == dir){
            return;
        }
        
        this._lastDir = dir;
        this._lastAct = act;
        let curClip = await roleAnimation(3800, act, dir);
        let addonani = this.node.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }

    setModel<T>(model:T){
        this._model = model;
    }

    updateAvatar(){
        this._model.resId;
    }

    idle(dir: number = null){
        if(dir == null){
            dir = this._lastDir;
        }
        this.runAction(dir);
    }
}
