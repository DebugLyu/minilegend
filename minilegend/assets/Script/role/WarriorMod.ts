import livingMod from "./LivingMod";
import { Attribute, AttrIds } from "../common/G";

export default class WarriorMod extends livingMod {
    // 属性值
    attr: Attribute = new Attribute();
    // 是否死亡
    isdead : boolean = false;
    // 技能列表
    skillList: number[];

    
    set hp(hp: number){
        this.attr[AttrIds.Hp] = hp;
        this.checkHp();
    }
    get hp(): number{
        return this.attr[AttrIds.Hp];
    }
    
    dead(){
        this.attr[AttrIds.Hp] = 0;
        this.isdead = true;
    }

    checkHp(){
        if(this.hp <= 0){
            this.dead();
        }
    }

    getAttr(attrid: AttrIds): number{
        return this.attr[attrid];
    }
}