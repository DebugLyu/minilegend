import { getRes, RootDir } from "../common/gFunc";

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

    async init() {
        let monsterjson = require(RootDir("../app/prop_data/prop_monster"));
        if (monsterjson == null) {
            console.error("Prop Monster read Error");
            return;
        }
        this.monsterDataList = monsterjson;
    }

    getMonsterData(monid: number): MonsterData {
        return this.monsterDataList[monid];
    }
}

let monsterMgr = new MonsterMgr();
export default monsterMgr;