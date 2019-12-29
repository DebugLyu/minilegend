import RoleEx from "../role/RoleEx";
import { getPrefab, getNextPos } from "../common/gFunc";
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
        roleEx.updateRole(role);
        this.roleExList[onlyid] = roleExNode;
    }

    delRoleEx(onlyid) {
        let node = this.roleExList[onlyid];
        if (node) {
            node.destroy();
        }
        delete this.roleExList[onlyid];
    }

    cleanAllEffect(){
        for (const onlyid in this.roleExList) {
            if (this.roleExList.hasOwnProperty(onlyid)) {
                const roleEx = this.roleExList[onlyid];
                roleEx.destroy();
            }
        }
        this.roleExList = {};

        for (const eid in this.flyEffectList) {
            if (this.flyEffectList.hasOwnProperty(eid)) {
                const flyeffect = this.flyEffectList[eid];
                flyeffect.node.destroy();
            }
        }
        this.flyEffectList = {};
    }

    showHitNum(num: number, x: number | cc.Vec2, y?: number, self?: boolean) {
        let labelnode = cc.instantiate(this.hitNum);
        labelnode.scale = 0.01;//  .setParent = 0;
        labelnode.parent = this.node;
        labelnode.zIndex = 9;
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

        // labelnode.scale = 2;

        labelnode.runAction(cc.sequence(cc.delayTime(.2), cc.moveBy(0.8, 0, 120), cc.removeSelf(true)));
        labelnode.runAction(cc.sequence(cc.scaleTo(.2, 2), cc.scaleTo(0.2, 1), cc.delayTime(0.2), cc.fadeOut(0.4)));
    }

    addFlyEffect(effectid: number, pixx: number, pixy: number, speed: number, angle: number): FlyEffect {
        let flyEff = cc.instantiate(this.flyEffect);
        let flySpt = flyEff.getComponent(FlyEffect);
        flySpt.effectOnlyId = EffectSeedID;
        flySpt.speed = speed;
        flySpt.angle = angle;

        flyEff.angle = angle - 90;
        flySpt.playEffect(effectid);
        flyEff.parent = this.node;
        flyEff.x = pixx;
        flyEff.y = pixy;
        this.flyEffectList[flySpt.effectOnlyId] = flySpt;
        flySpt.effectLayer = this;
        EffectSeedID++;
        return flySpt;
    }

    delFlyEffect(effectOnlyId: number, cleanup: boolean = true) {
        let flyeffect = this.flyEffectList[effectOnlyId];
        if (flyeffect) {
            delete this.flyEffectList[effectOnlyId];
            if (cleanup) {
                flyeffect.node.destroy();
            }
        }
    }

    update(dt) {
        this.checkFlyEffectPos(dt);
    }

    checkFlyEffectPos(dt) {
        for (const onlyid in this.flyEffectList) {
            if (this.flyEffectList.hasOwnProperty(onlyid)) {
                const flyEffect = this.flyEffectList[onlyid];
                if (!flyEffect.isLife) {
                    continue;
                }
                let curpos = flyEffect.node.position;
                let maxx = cc.winSize.width + (-this.node.parent.x) + 50;
                let maxy = cc.winSize.height + (-this.node.parent.y) + 50;
                if (curpos.x > maxx || curpos.x < -50 ||
                    curpos.y > maxy || curpos.y < -50) {
                    this.delFlyEffect(flyEffect.effectOnlyId);
                    continue;
                }
                let spd = flyEffect.speed;
                let len = spd * dt;
                let nextpos = getNextPos(flyEffect.node.position, len, flyEffect.angle);
                flyEffect.node.position = nextpos;
            }
        }
    }
}
