import { roleAnimation } from "../common/gFunc";
import livingMod from "./livingMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")
export default class LivingCtr extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;

    @property(cc.Label)
    roleName: cc.Label = null;
    
    public _model: any = null;

    start(){
        this.runAction();
    }

    async runAction(dir:number = 2, act: string = "idle") {
        let curClip = await roleAnimation(3800, act, dir);
        let addonani = this.roleNode.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }

    setModel<T>(model:T){
        this._model = model;
    }

    updateAvatar(){
        this._model.resId;
    }

    idle(dir: number){
        this.runAction(dir);
    }
}
