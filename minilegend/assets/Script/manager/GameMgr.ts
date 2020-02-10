import itemMgr from "./ItemMgr";
import mapMgr from "./MapMgr";
import monsterMgr from "./MonsterMgr";
import skillMgr from "./SkillMgr";
import { getRes } from "../common/gFunc";
import attributeMgr from "./AttributeMgr";
import equipMgr from "./EquipMgr";
import expMgr from "./ExpMgr";
import UIMgr from "./UIMgr";

class GameMgr {
    config: any = null;
    rURL:string = "";

    private eventList: (() => void)[] = [];

    async init() {
        // 初始化 属性系统 需要最早初始化
        await attributeMgr.init();
        // 经验
        await expMgr.init();
        // 地图管理器初始化
        await mapMgr.init();
        // 物品管理器初始化
        await itemMgr.init();
        // 怪物管理器
        await monsterMgr.init();
        // 技能管理器
        await skillMgr.init();
        // 装备管理器
        await equipMgr.init();

        // 通用UI
        await UIMgr.init();

        // 配置表
        let config = await getRes("/etc/config", cc.JsonAsset);
        if (config == null) {
            throw "Config Error";
        }
        let json = config.json;
        this.config = json;
        if (json.dev) {
            this.config.host = this.config.devhost;
        }
        this.rURL = "http://" + this.config.host + ":" + this.config.port;
        
        // 初始化完毕 回调
        for (let i = 0; i < this.eventList.length; i++) {
            const func = this.eventList[i];
            func();
        }
    }

    regGameStart(func: ()=>void){
        this.eventList.push(func);
    }
}
let gameMgr = new GameMgr();
export default gameMgr;