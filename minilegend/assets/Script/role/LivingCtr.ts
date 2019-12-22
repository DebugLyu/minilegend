import { gameAnimation, actState2Str } from "../common/gFunc";
import LivingMod from "./LivingMod";
import { ActState } from "../common/G";
import WeaponCtr from "./weaponCtr";
import Role from "./Role";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/LivingCtr")
export default class LivingCtr extends cc.Component {
    model = new LivingMod(this);
    role: Role = null;
    // 当前状态
    state: ActState = ActState.IDLE;
    // 当前方向 0：未初始化状态
    dir: number = 0;
    // 像素高度，用于记录大致的 血条位置
    pixHight: number = 0;

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
        this.role = this.node.parent.getComponent(Role);
        // this.runAction(2, ActState.IDLE);
    }

    findAnimation(animation: cc.Animation, name: string): cc.AnimationClip {
        let list = animation.getClips();
        for (let i = 0; i < list.length; i++) {
            const ani = list[i];
            if (ani.name == name) {
                return ani;
            }
        }
        return null;
    }

    async runAction(dir?: number, act?: number) {
        if (this.resId == 0){
            return;
        }
        if (dir == null) {
            dir = this.dir;
        }
        if (act == null) {
            act = this.state;
        }
        if (this.state == act && this.dir == dir) {
            return;
        }

        this.dir = dir;
        this.state = act;

        let isloop = false;
        if (this.state == ActState.IDLE || this.state == ActState.RUN) {
            isloop = true;
        }

        let aniname = String(this.resId) + String(this.state) + String(this.dir);
        let addonani = this.node.getComponent(cc.Animation);
        let curClip = this.findAnimation(addonani, aniname);
        if (!isloop && this.state != ActState.DIE) {
            let finished = () => {
                this.runAction(null, ActState.IDLE);
                addonani.off('finished', finished);
            }
            addonani.on('finished', finished);
        }

        if (curClip == null) {
            curClip = await gameAnimation("role", this.resId, act, dir);
            if (curClip == null && act == ActState.MGC) {
                this.runAction(dir, ActState.ATK);
                return;
            }
            curClip.name = aniname;
            curClip.wrapMode = isloop ? cc.WrapMode.Loop : cc.WrapMode.Default;
            addonani.addClip(curClip);
        }

        if (this.weapon.resId != 0) {
            let weaponAni = this.weapon.node.getComponent(cc.Animation);
            aniname = String(this.weapon.resId) + String(this.state) + String(this.dir);
            let weaponClip = this.findAnimation(weaponAni, aniname);
            if (weaponClip == null) {
                weaponClip = await gameAnimation("weapon", this.weapon.resId, this.state, this.dir);
                weaponClip.name = aniname;
                weaponClip.wrapMode = isloop ? cc.WrapMode.Loop : cc.WrapMode.Default;
                weaponAni.addClip(weaponClip);
            }
            this.weapon.node.zIndex = (dir == 1 || dir == 4 || dir == 7) ? -1 : 1;
            weaponAni.play(weaponClip.name);
        }
        addonani.play(curClip.name);

        if (this.pixHight == 0) {
            this.scheduleOnce(() => {
                let sprite = this.node.getComponent(cc.Sprite);
                let t = sprite.spriteFrame.getRect();
                this.pixHight = t.height;
                if (sprite.spriteFrame.isRotated) {
                    this.pixHight = t.width;
                }
                this.role.stage.effectLayer.addRoleEx(this.model.onlyid, this.role);
                console.log("pixHight", this.pixHight);
            }, 0);

        }
    }

    updateAvatar() {
        this.runAction();
    }

    idle(dir: number = null) {
        if (dir == null) {
            dir = this.dir;
        }
        this.runAction(dir, ActState.IDLE);
    }
}
