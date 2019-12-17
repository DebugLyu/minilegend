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
    protected _lastDir: number = 2;

    start() {
        this.runAction();
    }

    async runAction(dir: number = 2, act: number = ActState.IDLE) {
        if (this.state == act && this._lastDir == dir) {
            return;
        }

        this._lastDir = dir;
        this.state = act;
        let curClip = await gameAnimation("role", 3800, act, dir);
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
            dir = this._lastDir;
        }
        this.runAction(dir);
    }
}
