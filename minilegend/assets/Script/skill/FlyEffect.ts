import { gameAnimation } from "../common/gFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlyEffect extends cc.Component {
    effectOnlyId: number = 0;
    skillid: number = 0;
    owner: number = 0;
    attack: number = 0;
    speed: number = 0;
    loaded: boolean = false;

    start() {

    }

    setInfo(skillid: number, attack: number, owner: number, effectid?: number) {
        this.skillid = skillid;
        this.owner = skillid;
        this.attack = attack;

        if (effectid) {
            this.playEffect(effectid);
        }
    }

    async playEffect(effectid: number) {
        let clip = await gameAnimation("effect", effectid);
        let animation = this.node.getComponent(cc.Animation);
        clip.name = "eff" + effectid;
        animation.addClip(clip);
        animation.play("eff" + effectid);
        if (!this.loaded) {
            this.loaded = true;
            let spriteFrame = clip.curveData.comps["cc.Sprite"].spriteFrame[0].value;
            let t = spriteFrame.getRect();
            let pixHight = t.height;
            let pixWidth = t.width;
            if (spriteFrame.isRotated()) {
                pixHight = t.width;
                pixWidth = t.height;
            }
            let box = this.node.getComponent(cc.BoxCollider);
            box.size.width = pixWidth;
            box.size.height = pixHight;
        }
    }
}