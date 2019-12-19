import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr<T extends PlayerMod> extends WarriorCtr<T> {
    
    onLoad(){
        super.onLoad();
        this.setModel(new PlayerMod(this));
        this.weaponResId = 1700;
    }

    start(){
        // 测试用 资源id 设置了 资源id 就可以形成动画了
        this.resId = 3800;
    }

    init(){
        
    }

    ptest(){
        
    }
}
