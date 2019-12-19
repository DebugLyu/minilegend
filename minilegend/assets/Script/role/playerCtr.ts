import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";
import MapMgr from "../manager/MapMgr";
import Stage from "../map/Stage";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr extends WarriorCtr {
    
    get model(): PlayerMod {
        return <PlayerMod>this._model;
    }

    onLoad() {
        super.onLoad();
        this.setModel(new PlayerMod(this));
        this.weaponResId = 1700;
    }

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
