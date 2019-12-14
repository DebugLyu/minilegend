import livingMod from "./livingMod";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LivingCtr extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;

    @property(cc.Label)
    roleName: cc.Label = null;
    
    public _model: any = null;
    setModel<T>(model:T){
        this._model = model;
    }

    updateAvatar(){
        this._model.resId;
    }

    idle(){

    }
}
