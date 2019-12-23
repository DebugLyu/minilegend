import Role from "../role/Role";
import MonsterCtr from "../role/MonsterCtr";
import ObjectMgr from "./ObjectMgr";
import Stage from "../map/Stage";

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
    
    Skills = [];
    Items = [];
}

export default class MonsterMgr {
    private static _instance: MonsterMgr = null
    public static get instance(): MonsterMgr {
        if (this._instance == null) {
            this._instance = new MonsterMgr();

        }
        return this._instance;
    }

    private monsterDataList: { [key: number]: MonsterData } = {};
    private monPrefab: cc.Prefab = null;

    init() {
        cc.loader.loadRes("prop_data/prop_monster", cc.JsonAsset, (error, data) => {
            this.monsterDataList = data.json;
        });
        cc.loader.loadRes("prefab/role/MonsterRole", cc.Prefab, (error, prefab) => {
            if(error){
                console.log(error);
                return;
            }
            this.monPrefab = prefab;
        });
    }

    getMonsterData(monid: number): MonsterData {
        return this.monsterDataList[monid];
    }

    genMonster(monid: number, stage?: Stage, x?: number, y?: number): cc.Node {
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
        
        if(stage){
            node.parent = stage.node.getChildByName("RoleLayer");
            ObjectMgr.instance.addObject(role);
            stage.roleEnter(role);
        }
        
        if(x){
            role.x = x;
        }
        if(y){
            role.y = y;
        }
        
        return node;
    }
}