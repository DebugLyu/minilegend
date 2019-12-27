import { gameAnimation } from "../common/gFunc";
import EffectLayer from "../map/EffectLayer";
import Role from "../role/Role";
import { LivingType } from "../common/G";
import { SkillBase } from "../manager/SkillMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlyEffect extends cc.Component {
    effectOnlyId: number = 0;
    owner: number = 0;
    attack: number = 0;
    speed: number = 0;
    loaded: boolean = false;
    angle: number = 0;// 角度
    
    
    private _skill : SkillBase;
    public get skill() : SkillBase {
        return this._skill;
    }
    public set skill(v : SkillBase) {
        this._skill = v;
        this.collideTimes = v.collideTimes;
        this.bounce = v.bounce;
        this.flyEffect = v.flyEffect;
        this.speed = v.flySpeed;
        this.boomEffect = v.enemyEffect;
    }
    
    
    collideTimes: number = 0;// 碰撞次数
    bounce: number = 0;// 弹射次数
    flyEffect: number = 0;
    boomEffect: number = 0;

    targetLivingType: LivingType = 0;
    effectLayer: EffectLayer = null;
    isLife:boolean = false;

    start() {

    }

    async playEffect(effectid: number, isLoop: boolean = true) {
        if(effectid == 0){
            return;
        }
        this.flyEffect = effectid;
        let clip = await gameAnimation("effect", effectid);
        if (this.node == null) {
            return;
        }
        let animation = this.node.getComponent(cc.Animation);
        clip.name = "eff" + effectid;
        animation.addClip(clip);
        clip.wrapMode = isLoop? cc.WrapMode.Loop: cc.WrapMode.Normal;
        animation.play(clip.name);
        if (!this.loaded) {
            this.loaded = true;
            this.isLife = true;
            let spriteFrame = clip.curveData.comps["cc.Sprite"].spriteFrame[0].value;
            let t = spriteFrame.getRect();
            let pixHight = t.height;
            let pixWidth = t.width;
            let box = this.node.getComponent(cc.BoxCollider);
            box.size.width = pixWidth;
            box.size.height = pixHight;
            box.offset.x = 0;
            box.offset.y = -pixHight/2;
        }
    }

    async addBoomEffect(effectid:number){
        let parent = this.node.parent;
        let pos = this.node.position;

        let node = new cc.Node();
        node.addComponent(cc.Sprite);
        let animation = node.addComponent(cc.Animation);
        let clip = await gameAnimation("effect", effectid);
        clip.name = "eff" + effectid;
        clip.wrapMode = cc.WrapMode.Normal;
        animation.addClip(clip);
        animation.once("finished", () => {
            node.destroy();
        });
        animation.play(clip.name)
        node.parent = parent;
        node.position = pos;
    }

    onCollisionEnter(other: cc.BoxCollider, self:cc.BoxCollider) {
        let role = other.node.getComponent(Role);
        if(role.model.livingType != this.targetLivingType){
            return;
        }
        this.addBoomEffect(this.boomEffect);
        if (this.collideTimes <= 0) {
            this.effectLayer.delFlyEffect(this.effectOnlyId);
            return;
        }
        this.collideTimes--;
    }
}