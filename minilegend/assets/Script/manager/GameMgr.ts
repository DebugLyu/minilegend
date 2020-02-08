import itemMgr from "./ItemMgr";
import mapMgr from "./MapMgr";
import monsterMgr from "./MonsterMgr";
import skillMgr from "./SkillMgr";
import { getRes } from "../common/gFunc";
import attributeMgr from "./AttributeMgr_bak";
import equipMgr from "./EquipMgr";

class GameMgr {
    config: any = null;
    rURL:string = "";

    private eventList: (() => void)[] = [];

    async init() {
        // 初始化 属性系统 需要最早初始化
        await attributeMgr.init();
        await mapMgr.init();
        await itemMgr.init();
        await monsterMgr.init();
        await skillMgr.init();
        await equipMgr.init();

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