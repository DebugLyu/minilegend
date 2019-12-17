import livingMod from "./LivingMod";

export default class WarriorMod extends livingMod {
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