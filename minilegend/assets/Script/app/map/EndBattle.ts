import { getAnimation, getRes } from "../../common/gFunc"
import { dropInfo } from "../../common/G";
import ItemMgr from "../../manager/ItemMgr";
import GameSceneMgr from "../../manager/GameSceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EndBattle extends cc.Component {
    itemBg:cc.Node = null;

    start () {
        this.itemBg = this.node.getChildByName("itemBg");
        this.init();
    }

    async init(){
        let node = this.node.getChildByName("title");
        let animation = node.getComponent(cc.Animation);
        let clip = await getAnimation("effect", "BattleWin");
        clip.name = "BattleWin";
        animation.addClip(clip);
        animation.play(clip.name);
    }

    async addItemList(itemlist: {[key:number]:number}){
        let basenode = cc.find("itemBg/item", this.node);
        let n = 0;
        let itemAtlas = await getRes("item/ItemIcon", cc.SpriteAtlas);
        for (const itemid in itemlist) {
            if (itemlist.hasOwnProperty(itemid)) {
                const num = itemlist[itemid];
                let iteminfo = ItemMgr.getItemData(Number(itemid));
                let node = cc.instantiate(basenode);
                let icon = node.getChildByName("icon").getComponent(cc.Sprite);
                icon.spriteFrame = itemAtlas.getSpriteFrame(String(iteminfo.icon));
                node.active = true;
                let label = node.getChildByName("numlabel").getComponent(cc.Label);
                label.string = iteminfo.name + "✖" + num;
                node.parent = basenode.parent;
                node.scale = 0;
                cc.tween(node)
                    .delay((n + 1) * 0.2)
                    .to(0.2, {scale: 1})
                    .start();
                // node.runAction(cc.sequence(
                //     cc.delayTime( (n+1) * 0.2),
                //     cc.scaleTo(0.2, 1),
                // ));
                n++;
            }
        }
    }

    onExitClicked(e, d){
        GameSceneMgr.ChangeScene("Main");
    }
    // update (dt) {}
}
