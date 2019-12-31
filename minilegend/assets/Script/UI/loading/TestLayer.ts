import Stage from "../../map/Stage";
import MonsterMgr from "../../manager/MonsterMgr";
import { random } from "../../common/gFunc";
import MapMgr from "../../manager/MapMgr";
import PlayerMgr from "../../manager/PlayerMgr";
import BattleScene from "../../map/BattleScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestLayer extends cc.Component {
    @property(BattleScene)
    battleScene: BattleScene = null;


    start() {
        let addmonster = this.node.getChildByName("addmonster");
        addmonster.on("click", this.onAddMonsterClicked, this);
        let relive = this.node.getChildByName("relive");
        relive.on("click", this.relive, this);
        let createitem = this.node.getChildByName("createitem");
        createitem.on("click", this.createItem, this);
    }

    // update (dt) {}
    relive(e, d) {
        let role = PlayerMgr.instance.mainRole;
        role.relive();
    }

    onAddMonsterClicked(e, d) {
        let random_x = random(this.battleScene.stageData.lines);;
        let random_y = random(this.battleScene.stageData.rows);;
        let vailed = true;
        while (vailed) {
            let info = this.battleScene.stageData.mapInfo;
            if (info[random_y][random_x] > 0) {
                vailed = false;
            } else {
                random_x = random(this.battleScene.stageData.lines);
                random_y = random(this.battleScene.stageData.rows);
            }
        }
        MonsterMgr.instance.genMonster(1000, this.battleScene, random_x, random_y);
    }

    createItem(e, d){
        let role = PlayerMgr.instance.mainRole;
        if(role == null){
            return;
        }
        let itemlist = [
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
            {itemid: 100001, num: 3},
        ]
        this.battleScene.dropItem(itemlist, cc.v2(role.x, role.y));
    }
}
