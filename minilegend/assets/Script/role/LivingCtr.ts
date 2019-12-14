import livingMod from "./livingMod";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LivingCtr extends cc.Component {
    @property(cc.Node)
    roleNode: cc.Node = null;
    
    public model: any = null;
    setModel<T>(model:T){
        this.model = model;
    }
    updateAvatar(){
        this.model.resId;
    }
}
