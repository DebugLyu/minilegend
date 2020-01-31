import Role from "../role/Role";
import MonsterCtr from "../role/MonsterCtr";
import Stage from "../map/Stage";
import BattleScene from "../map/BattleScene";
import { getRes } from "../common/gFunc";

export class MonsterData {
    monid = 0;
    Name = "未知";
    ResID = 0;

    MaxHp = 0;// 当前生命值
    Speed = 240;// 移动速度
    AtkMin = 0;// 攻击力
    AtkMax = 0;
    Defense = 0;// 防御力
    MatkMin = 0;// 魔法攻击力
    MatkMax = 0;
    Mdefense = 0;// 魔法防御力
    DatkMin = 0;// 道术攻击力
    DatkMax = 0;
    Ddefense = 0;// 道术防御力

    Skills = []; // 技能
    Items = []; // 物品掉落列表
    DropNum = 1 // 物品掉落数量
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
        this.monsterDataList = monsterjson.json;
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