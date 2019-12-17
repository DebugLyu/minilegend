import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";
import livingMod from "./LivingMod";
import Stage from "../map/Stage";
import { ActState } from "../common/G";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr<T extends PlayerMod> extends WarriorCtr<T> {
    
    // private model: PlayerMod = new PlayerMod(this);

    @property(Stage)
    stage: Stage = null;

    start() {
        this.setModel(new PlayerMod(this));
        this.runAction();
    }

    update(dt){
        super.update(dt);
        if(this.state == ActState.RUN){
            this.stage.checkPlayerPos();
        }
    }

    ptest(){
        
    }
}
