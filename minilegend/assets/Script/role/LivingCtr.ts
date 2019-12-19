import { gameAnimation } from "../common/gFunc";
import livingMod from "./LivingMod";
import { ActState } from "../common/G";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")
export default class LivingCtr<T extends livingMod> extends cc.Component {
    @property(cc.Label)
    roleName: cc.Label = null;

    model: T = null;
    // 当前状态
    state: ActState = ActState.IDLE;
    // 当前方向
    dir: number = 2;
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
        let weaponNode = this.node.getChildByName("weapon");
        weaponNode.active = this._weaponResId == 0;
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
            let weaponNode = this.node.parent.getChildByName("weapon");
            weaponNode.zIndex = (dir == 1 || dir == 4 || dir == 7 ) ? -1 : 1;
            let weaponAni = weaponNode.getComponent(cc.Animation);
            weaponAni.addClip(weaponClip);
            weaponAni.play(weaponClip.name);
        }

        let addonani = this.node.getComponent(cc.Animation);
        addonani.addClip(curClip);
        addonani.play(curClip.name);
    }

    setModel(model) {
        this.model = model;
    }

    getModel(): T {
        return this.model;
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
