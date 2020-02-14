import { getRes } from "../../../common/gFunc";
import GameSceneMgr from "../../../manager/GameSceneMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/stagenode")
export default class UIStageNode extends cc.Component {
    @property(cc.Label)
    nameLabel:cc.Label = null;

    get stageName(){
        return this.nameLabel ? this.nameLabel.string : "";
    }
    set stageName(n: string){
        this.nameLabel && (this.nameLabel.string = n);
    }

    @property(cc.Sprite)
    bgsprite:cc.Sprite = null;

    async setBackgroud(n: string){
        let t = await getRes("stage/" + n, cc.SpriteFrame);
        this.bgsprite.spriteFrame = t;
    }

    onClick(e, d){
        GameSceneMgr.ChangeScene("Battle");
    }
}