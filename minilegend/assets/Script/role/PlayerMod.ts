import WarriorMod from "./WarriorMod";
import { LivingType } from "../common/G";
import PlayerCtr from "./playerCtr";

export default class PlayerMod extends WarriorMod {
    playerid: number = 0;// 玩家id
    // maxStage: number = 0;
    // token 验证上下文
	token: string = "";
	// uuid
	uuid: string = "";
	// 等级
	level: number = 0;
	// 经验
	exp: number = 0;

	// 当前装备
	// equips: equip[] = [];
	// 背包物品
	// items: item[] = [];
	// 元宝
	gold: number = 0;
	// 银币
	coin: number = 0;

	// 最高地图
	maxMap: number = 0;
	// 最大关卡
	maxStage: number = 0;
	
   
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

    setData(pinfo: any){
        this.onlyid = pinfo.onlyid;
        this.playerid = pinfo.playerid;
        this.attr = pinfo.attr;
        this.name = pinfo.name;
        this.level = pinfo.level;
        this.exp = pinfo.exp;
        this.maxMap = pinfo.maxMap;
        this.maxStage = pinfo.maxStage;
        this.skillList = pinfo.skillList;
        this.token = pinfo.token;
        this.uuid = pinfo.uuid;
        this.gold = pinfo.gold;
        this.coin = pinfo.coin;
    }
}
