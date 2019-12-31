import { getAnimation, getItemAtlas } from "../common/gFunc"
import { dropInfo } from "../common/G";
import ItemMgr from "../manager/ItemMgr";

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
        let itemAtlas = await getItemAtlas();
        for (const itemid in itemlist) {
            if (itemlist.hasOwnProperty(itemid)) {
                const num = itemlist[itemid];
                let iteminfo = ItemMgr.instance.getItemData(Number(itemid));
                let node = cc.instantiate(basenode);
                let icon = node.getChildByName("icon").getComponent(cc.Sprite);
                icon.spriteFrame = itemAtlas.getSpriteFrame(String(iteminfo.icon));
                node.active = true;
                let label = node.getChildByName("numlabel").getComponent(cc.Label);
                label.string = iteminfo.name + "✖" + num;
                node.parent = basenode.parent;
                node.scale = 0;
                node.runAction(cc.sequence(
                    cc.delayTime( (n+1) * 0.2),
                    cc.scaleTo(0.2, 1),
                ));
                n++;
            }
        }
    }

    // update (dt) {}
}
