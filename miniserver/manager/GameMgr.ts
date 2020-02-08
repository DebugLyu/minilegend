import itemMgr from "./ItemMgr";
import mapMgr from "./MapMgr";
import monsterMgr from "./MonsterMgr";
import skillMgr from "./SkillMgr";
import attributeMgr from "./AttributeMgr";
import equipMgr from "./EquipMgr";
import { mysqldb } from "../util/mysqldb";
import { getRes } from "../common/gFunc";
import { redisdb } from "../util/redisdb";

class GameMgr {
    config: any = null;

    private eventList: (() => void)[] = [];

    async init() {
        // 初始化 属性系统 需要最早初始化
        await attributeMgr.init();
        await mapMgr.init();
        await itemMgr.init();
        await monsterMgr.init();
        await skillMgr.init();
        await equipMgr.init();

        let config = await getRes("../etc/config");
        if (config == null) {
            throw "Config Error";
        }
        this.config = config;
        if (config.dev) {
            // this.config.host = this.config.devhost;
        }
        
        redisdb.init(config.redis);
        mysqldb.init(config.dbconfig);

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