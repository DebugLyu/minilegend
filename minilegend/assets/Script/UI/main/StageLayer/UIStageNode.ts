import { getRes } from "../../../common/gFunc";
import playerMgr from "../../../manager/PlayerMgr";
import { Net } from "../../../net/net";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/stageitem")
export default class UIStageItem extends cc.Component {
    stageid: number = 0;

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

    onClick(){
        playerMgr.mainData.lastStage = this.stageid;
        Net.enterStage({stageid: this.stageid});
    }
}