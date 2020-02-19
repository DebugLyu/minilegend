import UIMgr from "../../manager/UIMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UINodeBg")
export default class UINodeBg extends cc.Component {
    start(){
        this.node.on("click", () => {
            UIMgr.hideUI();
        })
    }
}