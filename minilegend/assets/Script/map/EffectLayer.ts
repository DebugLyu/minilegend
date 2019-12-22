import RoleEx from "../role/RoleEx";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EffectLayer extends cc.Component {

    @property(cc.Node)
    hitNum: cc.Node = null;

    @property(cc.Node)
    roleEx: cc.Node = null;

    roleList: {[key:number]: cc.Node} = {};
    
    start() {

    }

    addRoleEx(onlyid, role){
        let roleExNode = cc.instantiate(this.roleEx);
        roleExNode.parent = this.roleEx.parent;
        let roleEx = roleExNode.getComponent(RoleEx);
        roleEx.setRole(role);
        this.roleList[onlyid] = roleExNode;
    }

    delRoleEx(onlyid){
        let node = this.roleList[onlyid];
        if(node){
            node.destroy();
        }
        delete this.roleList[onlyid];
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
            labelnode.position = x.add(cc.v2(0 , 50));
        }

        if (self){
            labelnode.color = cc.color(255, 200, 0);
        }

        labelnode.scale = 2;

        labelnode.runAction(cc.sequence(cc.hide(), cc.delayTime(.2), cc.show(), cc.moveBy(0.8, 0, 120), cc.removeSelf(true)));
        labelnode.runAction(cc.sequence(cc.hide(), cc.delayTime(.2), cc.show(),cc.scaleTo(0.2, 1), cc.delayTime(0.2), cc.fadeOut(0.4)));
    }

    // update (dt) {}
}
