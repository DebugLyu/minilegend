import gameMgr from "../../manager/GameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILoading extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    onEnable(){
        gameMgr.init();
    }

    start () {

    }

}