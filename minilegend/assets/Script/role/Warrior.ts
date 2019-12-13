import living from "./Living";

export default class Warrior extends living {
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