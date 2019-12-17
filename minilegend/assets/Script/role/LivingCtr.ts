import { gameAnimation } from "../common/gFunc";
import livingMod from "./LivingMod";
import { ActState } from "../common/G";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")

export default class LivingCtr<T extends livingMod> extends cc.Component {
    @property(cc.Label)
    roleName: cc.Label = null;

    protected _model: T = null;
    public state: ActState = ActState.IDLE;
    lastDir: number = 2;
    resid : number = 3800;
    weapon_res_id: number = 0; // 武器id

    start() {
        this.runAction();
        if(this.weapon_res_id == 0){
            let weaponNode = this.node.getChildByName("weapon");
            weaponNode.active = false;
        }
    }

    async runAction(dir: number = 2, act: number = ActState.IDLE) {
        if (this.state == act && this.lastDir == dir) {
            return;
        }

        this.lastDir = dir;
        this.state = act;
        let curClip = await gameAnimation("role", this.resid, act, dir);

        if(this.weapon_res_id != 0){
            let weaponClip = await gameAnimation("weapon", this.weapon_res_id, this.state, this.lastDir);
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
        this._model = model;
    }

    getModel(): T {
        return this._model;
    }

    updateAvatar() {
        this._model.resId;
    }

    idle(dir: number = null) {
        if (dir == null) {
            dir = this.lastDir;
        }
        this.runAction(dir);
    }
}
