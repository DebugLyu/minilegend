import Role from "../role/Role";
import MonsterCtr from "../role/MonsterCtr";
import BattleScene from "../app/map/BattleScene";
import { getRes, safeJson } from "../common/gFunc";

let monster_seed_id = 10000000;

export class MonsterData {
    id = 0;
    name = "未知";
    resid = 0;
    skill = []; // 技能
    dropitem = []; // 物品掉落列表
    dropnum = 1; // 物品掉落数量
    attr = 0;
}

class MonsterMgr {
    private monsterDataList: { [key: number]: MonsterData } = {};
    private monPrefab: cc.Prefab = null;

    async init() {
        let monsterjson = await getRes("prop_data/prop_monster", cc.JsonAsset);
        if (monsterjson == null) {
            console.error("Prop Monster read Error");
            return;
        }
        let json = monsterjson.json;
        for (const monid in json) {
            if (json.hasOwnProperty(monid)) {
                const obj = json[monid];
                obj.skill = safeJson(obj.skill);
                obj.dropitem = safeJson(obj.dropitem);
            }
        }
        this.monsterDataList = json;

        let prefab = await getRes("prefab/role/MonsterRole", cc.Prefab);
        if (prefab == null) {
            console.error("Prop Monster read Error");
            return;
        }
        this.monPrefab = prefab;
    }

    getMonsterData(monid: number): MonsterData {
        return this.monsterDataList[monid];
    }

    genMonster(monid: number, btlScene?: BattleScene, x?: number, y?: number): cc.Node {
        if (this.monPrefab == null) {
            return;
        }
        let mondata = this.getMonsterData(monid);
        if (mondata == null) {
            return;
        }

        let node = cc.instantiate(this.monPrefab);
        let monsterctr = node.getChildByName("rolectr").getComponent(MonsterCtr);
        monsterctr.model.setMonData(mondata);
        monsterctr.model.onlyid = monster_seed_id++;
        let role = node.getComponent(Role);
        role.init();
        if (btlScene) {
            btlScene.roleEnter(role);
        }

        if (x) {
            role.x = x;
        }
        if (y) {
            role.y = y;
        }

        return node;
    }
}

let monsterMgr = new MonsterMgr();
export default monsterMgr;