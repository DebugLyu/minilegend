import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";
import livingMod from "./livingMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr extends WarriorCtr {
    
    // private model: PlayerMod = new PlayerMod(this);

    start() {
        this.setModel(new PlayerMod(this));
        this.runAction();
    }

    getModel():PlayerMod<this>{
        return this._model;
    }

    test(){
        
    }

    ptest(){

    }
}
