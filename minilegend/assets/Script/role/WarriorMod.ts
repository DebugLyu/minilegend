import WarriorCtr from "./WarriorCtr";
import livingMod from "./livingMod";

export default class WarriorMod<T extends WarriorCtr> extends livingMod<T> {
	hp: number = 0;
    isdead : boolean = false;


    setHp(hp: number){
        this.hp = hp;
        this.checkHp();
    }

    subHp(hp: number){
        this.hp -= hp;
        this.checkHp();
    }

    dead(){
        this.isdead = true;
    }

    checkHp(){
        if(this.hp <= 0){
            this.dead;
        }
    }
}