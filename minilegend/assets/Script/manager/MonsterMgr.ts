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
    private static instance: MonsterMgr = null
    public static getInstance(): MonsterMgr {
        if (this.instance == null) {
            this.instance = new MonsterMgr();

        }
        return this.instance;
    }

    private monsterDataList = new Map<number, MonsterData>(); // { [key: number]: MonsterData } = {};

    init() {
        cc.loader.loadRes("prop_data/prop_monster", cc.JsonAsset, (error, data) => {
            this.monsterDataList = data.json;
        });
    }

    getMonsterData(monid: number): MonsterData {
        return this.monsterDataList[monid];
    }
}