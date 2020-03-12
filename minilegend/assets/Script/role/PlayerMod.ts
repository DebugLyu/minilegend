import WarriorMod from "./WarriorMod";
import { LivingType, EquipPos, AttrIds, DefaultOutLookCloth, DefaultOutLookWeapon } from "../common/G";
import PlayerCtr from "./playerCtr";
import PlayerData from "../app/role/PlayerData";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
    // maxStage: number = 0;

    get control(): PlayerCtr{
        return this._control as PlayerCtr;
    }

    init(){
        super.init();
        this.livingType = LivingType.PLAYER;
    }

    test(){
        this.control.dead();
    }

    setData(pinfo: PlayerData){
        this.onlyid = pinfo.onlyid;
        this.playerid = pinfo.playerid;
        // 这里是测试用的 资源id
        let clothes = pinfo.equips[EquipPos.Clothes];
        if(clothes){
            this.control.resId = clothes.equipData.outlook;
        } else {
            this.control.resId = DefaultOutLookCloth;
        }

        let weapon = pinfo.equips[EquipPos.Weapon];
        if(weapon){
            this.control.weapon.resId = weapon.equipData.outlook;
        }
        
        this.attr = pinfo.attr.clone();
        this.name = pinfo.name;
        this.initSkill(pinfo.skills);
        this.relive();
    }
}
