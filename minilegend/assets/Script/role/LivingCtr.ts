import { gameAnimation } from "../common/gFunc";
import livingMod from "./LivingMod";
import { ActState } from "../common/G";
import WeaponCtr from "./weaponCtr";

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
    private _resid: number = 0;
    set resId(resid: number) {
        this._resid = resid;
        this.updateAvatar();
    }
    get resId(): number {
        return this._resid;
    }

    // 武器节点
    @property(WeaponCtr)
    weapon: WeaponCtr = null;

    onLoad() {

    }
    start() {
        if (this.weapon && this.weapon.resId == 0) {
            this.weapon.node.active = false;
        }
    }

    async runAction(dir: number = 2, act: number = ActState.IDLE) {
        if (this.state == act && this.dir == dir) {
            return;
        }

        this.dir = dir;
        this.state = act;
        let curClip = await gameAnimation("role", this.resId, act, dir);

        if (this.weapon.resId != 0) {
            let weaponClip = await gameAnimation("weapon", this.weapon.resId, this.state, this.dir);
            this.weapon.node.zIndex = (dir == 1 || dir == 4 || dir == 7) ? -1 : 1;
            let weaponAni = this.weapon.node.getComponent(cc.Animation);
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
