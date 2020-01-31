import itemMgr from "./ItemMgr";
import mapMgr from "./MapMgr";
import monsterMgr from "./MonsterMgr";
import skillMgr from "./SkillMgr";
import { getRes } from "../common/gFunc";

class GameMgr {
    config: any = null;

    async init() {
        await itemMgr.init();
        await mapMgr.init();
        await monsterMgr.init();
        await skillMgr.init();

        let config = await getRes("/etc/config.json", cc.JsonAsset);
        if (config == null) {
            throw "Config Error";
        }
        let json = config.json;
        this.config = json;
        if (json.dev) {
            this.config.host = this.config.devhost;
        }

    }
}
let gameMgr = new GameMgr();
export default gameMgr;