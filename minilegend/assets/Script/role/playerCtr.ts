import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";
import MapMgr from "../manager/MapMgr";
import Stage from "../map/Stage";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr extends WarriorCtr {
    @property(Stage)
    stage: Stage = null;

    get model(): PlayerMod {
        return <PlayerMod>this._model;
    }

    onLoad() {
        super.onLoad();
        this.setModel(new PlayerMod(this));
        this.weaponResId = 1700;
    }

    start() {
        // TODO:test 测试用 资源id 设置了 资源id 就可以形成动画了
        this.resId = 3800;
    }

    init() {

    }

    ptest() {
        this.model.test();
    }

    enterMap(mapid?: number){
        this.model.mapid = mapid;
        this.stage.loadMap(mapid, true);
        // this.enterStage
    }

    enterStage(stageid: number) {
        if(this.model.stageid == stageid){
            return;
        }

        let mapdata = MapMgr.getInstance().getMapData(this.model.mapid);
        let stagedata = mapdata.stageList[stageid];
        if (stagedata) {
            this.model.stageid = stageid;
            this.node.setPosition(cc.v2(stagedata.startPos.x, stagedata.startPos.y));

            this.stage.loadStage(stageid);
        }
    }
}
