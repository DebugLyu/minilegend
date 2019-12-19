import { gameAnimation } from "../common/gFunc";
import livingMod from "./LivingMod";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")
export default class LivingCtr extends cc.Component {
    protected _model: livingMod = null;
    // 当前状态
    state: ActState = ActState.IDLE;
    // 当前方向 0：未初始化状态
    dir: number = 0;
    // 资源id
    private _resid:number = 0;
    set resId(resid:number){
        this._resid = resid;
        this.updateAvatar();
    }
    get resId(): number{
        return this._resid;
    }

    // 武器资源id
    private _weaponResId = 0;
    get weaponResId(): number{
        return this._weaponResId;
    }
    set weaponResId(wResid: number){
        this._weaponResId = wResid;
        this.weaponNode.active = this._weaponResId == 0;
    }

    // 武器节点
    weaponNode: cc.Node = null;
    onLoad(){
        this.weaponNode = this.node.parent.getChildByName("weapon");
    }
    
    start() {
        if(this.weaponResId == 0){
            let weaponNode = this.node.getChildByName("weapon");
            weaponNode.active = false;
        }
        // this.runAction();
    }

    async runAction(dir: number = 2, act: number = ActState.IDLE) {
        if (this.state == act && this.dir == dir) {
            return;
        }

        this.dir = dir;
        this.state = act;
        let curClip = await gameAnimation("role", this.resId, act, dir);

        if(this.weaponResId != 0){
            let weaponClip = await gameAnimation("weapon", this.weaponResId, this.state, this.dir);
            this.weaponNode.zIndex = (dir == 1 || dir == 4 || dir == 7 ) ? -1 : 1;
            let weaponAni = this.weaponNode.getComponent(cc.Animation);
            weaponAni.addClip(weaponClip);
            weaponAni.play(weaponClip.name);
        }

        let addonani = this.node.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }

    setModel(model) {
        this._model = model;
    }

    get model(): livingMod {
        return this._model;
    }

    updateAvatar() {
        this.runAction();
    }

    idle(dir: number = null) {
        if (dir == null) {
            dir = this.dir;
        }
        this.runAction(dir);
    }
}
