import Stage from "../../map/Stage";
import MonsterMgr from "../../manager/MonsterMgr";
import { random } from "../../common/gFunc";
import MapMgr from "../../manager/MapMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestLayer extends cc.Component {
    @property(Stage)
    stage: Stage = null;


    start() {
        let btnnode = this.node.getChildByName("addmonster");
        btnnode.on("click", this.onAddMonsterClicked, this);
    }

    // update (dt) {}
    onAddMonsterClicked(e, d) {
        let random_x = random(this.stage.stageData.lines);;
        let random_y = random(this.stage.stageData.rows);;
        let vailed = true;
        while (vailed) {
            let info = this.stage.stageData.mapInfo;
            if (info[random_y][random_x] > 0) {
                vailed = false;
            } else {
                random_x = random(this.stage.stageData.lines);
                random_y = random(this.stage.stageData.rows);
            }
        }
        MonsterMgr.instance.genMonster(1000, this.stage, random_x, random_y);
    }
}
