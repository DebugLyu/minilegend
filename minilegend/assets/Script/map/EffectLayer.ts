import RoleEx from "../role/RoleEx";
import { getPrefab, gameAnimation, getNextPos } from "../common/gFunc";
import FlyEffect from "../skill/FlyEffect";

const { ccclass, property } = cc._decorator;

let EffectSeedID = 10000;

@ccclass
export default class EffectLayer extends cc.Component {

    @property(cc.Node)
    hitNum: cc.Node = null;

    @property(cc.Node)
    roleEx: cc.Node = null;

    flyEffect: cc.Prefab = null;

    flyEffectList: { [key: number]: FlyEffect } = {};
    roleExList: { [key: number]: cc.Node } = {};

    async start() {
        this.flyEffect = await getPrefab("effect/FlyEffect");
    }

    addRoleEx(onlyid, role) {
        let roleExNode = cc.instantiate(this.roleEx);
        roleExNode.parent = this.roleEx.parent;
        let roleEx = roleExNode.getComponent(RoleEx);
        roleEx.setRole(role);
        this.roleExList[onlyid] = roleExNode;
    }

    delRoleEx(onlyid) {
        let node = this.roleExList[onlyid];
        if (node) {
            node.destroy();
        }
        delete this.roleExList[onlyid];
    }

    showHitNum(num: number, x: number | cc.Vec2, y?: number, self?: boolean) {
        let labelnode = cc.instantiate(this.hitNum);
        labelnode.active = true;
        labelnode.parent = this.node;
        let label = labelnode.getComponent(cc.Label);
        label.string = "-" + num;

        if (typeof x == "number") {
            labelnode.x = x;
            labelnode.y = y + 50;
        } else {
            labelnode.position = x.add(cc.v2(0, 50));
        }

        if (self) {
            labelnode.color = cc.color(255, 200, 0);
        }

        labelnode.scale = 2;

        labelnode.runAction(cc.sequence(cc.hide(), cc.delayTime(.2), cc.show(), cc.moveBy(0.8, 0, 120), cc.removeSelf(true)));
        labelnode.runAction(cc.sequence(cc.hide(), cc.delayTime(.2), cc.show(), cc.scaleTo(0.2, 1), cc.delayTime(0.2), cc.fadeOut(0.4)));
    }

    addFlyEffect(effectid: number, pixx: number, pixy: number, speed: number, angle: number, skillid?: number, ownid?: number) {
        let flyEff = cc.instantiate(this.flyEffect);
        let flySpt = flyEff.getComponent(FlyEffect);
        flySpt.effectOnlyId = EffectSeedID;
        flySpt.speed = speed;
        flySpt.skillid = skillid ? skillid : 0;
        flySpt.owner = ownid ? ownid : 0;
        flySpt.angle = angle;

        flyEff.angle = angle - 90;
        let runaction = async () => {
            let clip = await gameAnimation("effect", effectid);
            let animation = flyEff.getComponent(cc.Animation);
            animation.addClip(clip);
            clip.name = "flyEffect" + effectid;
            animation.play(clip.name);
        }
        runaction();
        flyEff.parent = this.node;
        flyEff.x = pixx;
        flyEff.y = pixy;
        this.flyEffectList[flySpt.effectOnlyId] = flySpt;
        EffectSeedID++;
    }

    delFlyEffect(effectOnlyId: number) {
        let flyeffect = this.flyEffectList[effectOnlyId];
        if (flyeffect) {
            flyeffect.destroy();
            delete this.flyEffectList[effectOnlyId];
        }
    }

    update(dt) {
        this.checkFlyEffectPos(dt);
    }

    checkFlyEffectPos(dt) {
        for (const onlyid in this.flyEffectList) {
            if (this.flyEffectList.hasOwnProperty(onlyid)) {
                const flyEffect = this.flyEffectList[onlyid];
                let curpos = flyEffect.node.position;
                if (curpos.x > cc.winSize.width || curpos.x < 0 ||
                    curpos.y > cc.winSize.height || curpos.y < 0) {
                    this.delFlyEffect(flyEffect.effectOnlyId);
                    return;
                }
                let spd = flyEffect.speed;
                let len = spd * dt;
                let nextpos = getNextPos(flyEffect.node.position, len, flyEffect.angle);
                flyEffect.node.position = nextpos;
            }
        }
    }
}
