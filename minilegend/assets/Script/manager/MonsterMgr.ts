import Role from "../role/Role";
import MonsterCtr from "../role/MonsterCtr";

export class MonsterData {
    monid = 0;
    name = "未知";
    resid = 0;
    hp = 0;
    atkmin = 0;
    atkmax = 0;
    atksp = 1;
    def = 0;
    spd = 0;
    items: [];
}

export default class MonsterMgr {
    private static _instance: MonsterMgr = null
    public static get instance(): MonsterMgr {
        if (this._instance == null) {
            this._instance = new MonsterMgr();

        }
        return this._instance;
    }

    private monsterDataList = new Map<number, MonsterData>(); // { [key: number]: MonsterData } = {};
    private monPrefab: cc.Prefab = null;

    init() {
        cc.loader.loadRes("prop_data/prop_monster", cc.JsonAsset, (error, data) => {
            this.monsterDataList = data.json;
        });
        cc.loader.loadRes("prefab/role/MonsterRole", cc.Prefab, (error, prefab) => {
            this.monPrefab = prefab;
        });
    }

    getMonsterData(monid: number): MonsterData {
        return this.monsterDataList[monid];
    }

    genMonster(monid: number): cc.Node{
        if(this.monPrefab == null){
            return;
        }
        let mondata = this.getMonsterData(monid);
        if(mondata == null){
            return;
        }
        
        let node = cc.instantiate(this.monPrefab);
        let monsterctr = node.getChildByName("rolectr").getComponent(MonsterCtr);
        monsterctr.resId = mondata.resid;
        
        return node;
    }
}