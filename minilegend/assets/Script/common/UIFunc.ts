const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class UIFunc extends cc.Component {

    showUIComplete(){
        console.log(this.node.name + "加载显示完毕");
    }

    hideUIComplete(){
        console.log(this.node.name + "关闭显示完毕");
    }
}