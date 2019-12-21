import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr extends WarriorCtr {
    model:PlayerMod = new PlayerMod(this);

    start() {
        // TODO:test 测试用 资源id 设置了 资源id 就可以形成动画了
        this.resId = 3800;
    }

    init() {

    }

    ptest() {
        this.model.test();
    }
}
