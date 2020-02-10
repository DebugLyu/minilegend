
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/Notice")
export default class UINotice extends cc.Component {
    @property(cc.Label)
    tipsStr: cc.Label = null;

    set tips (n: string){
        this.tipsStr.string = n;
    }

    get tips (){
        return this.tipsStr.string;
    }
}