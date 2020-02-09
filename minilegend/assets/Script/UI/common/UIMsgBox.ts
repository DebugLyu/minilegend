
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("ui/MsgBox")
export default class UIMsgBox extends cc.Component {
    @property(cc.Label)
    tips: cc.Label = null;

    @property(cc.Node)
    okBtn: cc.Node = null;
    @property(cc.Node)
    cancelBtn: cc.Node = null;

    showBox(msg:string, type: number = 0, okCallback: ()=>void = null, cancelCallback: ()=>void = null){
        this.tips.string = msg;

        if(type == 0){
            this.okBtn.active = false;
            this.cancelBtn.active = false;
        }else if(type == 1){
            this.okBtn.x = 0;
            this.okBtn.active = true;
            this.cancelBtn.active = false;
        }else if(type == 2){
            this.okBtn.active = true;
            this.okBtn.x = -100;
            this.cancelBtn.active = true;
            this.cancelBtn.x = 100;
        }

        this.okBtn.on("click", () => {
            if(okCallback){
                okCallback();
            }
            this.node.destroy();
        });
        this.cancelBtn.on("click", () => {
            if(cancelCallback){
                cancelCallback();
            }
            this.node.destroy();
        });
    }
}
