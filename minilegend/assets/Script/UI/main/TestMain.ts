import GameSceneMgr from "../../manager/GameSceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {

    }

    onStageClickec(e, d){
        GameSceneMgr.ChangeScene("Battle");
    }
}
