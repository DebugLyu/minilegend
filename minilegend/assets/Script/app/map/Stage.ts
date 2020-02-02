/**
 *  场景管理
 *      用于控制场景移动，添加特效，地图块加载等
 *      掉落物品
 */

import mapMgr, { StageData } from "../../manager/MapMgr";
import { ActState, Cell, dropInfo } from "../../common/G";
import Role from "../role/Role";
import { getMapSpr, getAnimation, getNextPos, getAngle, random, getRes } from "../../common/gFunc";
import playerMgr from "../../manager/PlayerMgr";
import EffectLayer from "./EffectLayer";
import BattleScene from "./BattleScene";
import itemMgr from "../../manager/ItemMgr";

const { ccclass, menu } = cc._decorator;
let RootPos: cc.Vec2 = cc.Vec2.ZERO;
let OutRand = 1;

@ccclass
@menu("map/stage")
export default class Stage extends cc.Component {
    nodeArray: cc.Node[][] = [];
    stageId: number = 0;
    stageData: StageData = null;
    effectLayer: EffectLayer = null;

    // 主角色
    role: Role = null;

    battleScene: BattleScene = null;
    transportList: { [key: number]: cc.Node } = {};

    itemAtlas: cc.SpriteAtlas = null;
    isFinish: boolean = false;
    itemLight: cc.Texture2D = null;

    dropList: cc.Node[] = []; // 掉落的实物

    start() {

        this.battleScene = cc.find("Canvas").getComponent(BattleScene);
        this.effectLayer = this.node.getChildByName("EffectLayer").getComponent(EffectLayer);

        RootPos = cc.v2(-cc.winSize.width / 2, -cc.winSize.height / 2);

        cc.game.on("MainRole", this.setMainRole, this);
        this.init();
    }

    async init() {
        this.itemAtlas = await getRes("item/ItemIcon", cc.SpriteAtlas);
        this.itemLight = await getRes("item/light", cc.Texture2D);
    }

    setMainRole(role: Role) {
        this.role = role;
    }

    clearStage() {
        for (let i = 0; i < this.nodeArray.length; i++) {
            const list = this.nodeArray[i];
            for (let t = 0; t < list.length; t++) {
                const node = list[t];
                if (node != null) {
                    node.destroy();
                }
            }
        }
        this.nodeArray = [];

        for (const _ in this.transportList) {
            if (this.transportList.hasOwnProperty(_)) {
                const transport = this.transportList[_];
                transport.destroy();
            }
        }
        this.transportList = {};

        for (const itemnode of this.dropList) {
            itemnode.destroy();
        }
        this.dropList = [];

        this.effectLayer.cleanAllEffect();
    }

    changeStage(stageData: StageData) {
        this.clearStage();
        this.stageId = stageData.stageid;
        this.stageData = stageData;

        this.node.setPosition(RootPos);
        this.checkPlayerPos();
        this.checkMapNode();
        this.isFinish = false;
        this.dropList = [];
    }

    update(dt) {
        this.checkDropItem();
        if (this.role == null) {
            return;
        }
        if (this.role.warrior.state != ActState.RUN) {
            return;
        }
        this.checkPlayerPos();
        this.checkMapNode();
    }

    async playEffect(effectid: number, x: number, y: number) {
        let clip = await getAnimation("effect", effectid);
        if (clip == null) {
            return;
        }
        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        let animation = node.addComponent(cc.Animation);
        clip.name = "eff " + effectid;
        animation.addClip(clip);
        animation.play(clip.name);
        animation.on("finished", () => {
            node.destroy();
        });
        node.parent = this.node;
        node.zIndex = 1;
        node.position = cc.v2(x, y);
    }



    async addTransport() {
        for (let i = 0; i < this.stageData.trancePos.length; i++) {
            const tinfo = this.stageData.trancePos[i];
            let node = new cc.Node();
            let sprite = node.addComponent(cc.Sprite);
            sprite.trim = false;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            let animation = node.addComponent(cc.Animation);
            let tranClip = await getAnimation("effect", "transport");
            tranClip.name = "" + this.stageData.trancePos[0].tomap;
            tranClip.wrapMode = cc.WrapMode.Loop;
            animation.addClip(tranClip);
            animation.play(tranClip.name);

            node.parent = this.node;
            node.zIndex = 1;
            node.position = mapMgr.girdPos2pixPos(cc.v2(tinfo.x, tinfo.y));
            this.transportList[tinfo.tomap] = node;
        }
    }

    private checkPlayerPos() {
        if (this.role == null) {
            return;
        }
        let ppos = this.role.node.position;
        let topos = cc.v2(-ppos.x, -ppos.y);
        if (topos.x > RootPos.x) {
            topos.x = RootPos.x;
        }
        if (topos.x < cc.winSize.width - this.node.width + RootPos.x) {
            topos.x = cc.winSize.width - this.node.width + RootPos.x;
        }
        if (topos.y > RootPos.y) {
            topos.y = RootPos.y;
        }
        if (topos.y < cc.winSize.height - this.node.height + RootPos.y) {
            topos.y = cc.winSize.height - this.node.height + RootPos.y;
        }

        this.node.setPosition(topos);
    }

    private async checkMapNode() {
        let stagedata = this.stageData;
        let winsize = cc.winSize;

        let max_x = stagedata.width / Cell.width;
        let max_y = stagedata.height / Cell.height;

        let outx1 = - winsize.width - Cell.width * (OutRand - 1 + 0.5);
        let outx2 = winsize.width + Cell.width * (OutRand - 1 + 0.5);
        let outy1 = -winsize.height - Cell.height * (OutRand - 1 + 0.5);
        let outy2 = winsize.height + Cell.height * (OutRand - 1 + 0.5)

        for (let x = 0; x < max_x; x++) {
            if (this.nodeArray[x] == null) {
                this.nodeArray[x] = [];
            }

            for (let y = 0; y < max_y; y++) {
                let posx = x * Cell.width + Cell.width / 2;
                let posy = y * Cell.height + Cell.height / 2;
                let wpos = this.node.convertToWorldSpaceAR(cc.v2(posx, posy));
                if (wpos.x < outx1 || wpos.x > outx2 || wpos.y < outy1 || wpos.y > outy2) {
                    // 在外围
                    let node = this.nodeArray[x][y];
                    if (node) {
                        this.nodeArray[x][y] = null;
                        node.destroy()
                    }
                } else {
                    // 在屏幕内
                    let node = this.nodeArray[x][y];
                    if (node == null) {
                        let node = new cc.Node();
                        let spr = node.addComponent(cc.Sprite);
                        spr.spriteFrame = await getMapSpr(stagedata.resid, x, y);
                        node.setPosition(cc.v2(posx, posy));
                        node.parent = this.node;
                        node.zIndex = -1;
                        this.nodeArray[x][y] = node;
                    }
                }
            }
        }
    }

    getEmptyCell(gridpos: cc.Vec2): cc.Vec2 {
        let isEmptyCell = (gpos: cc.Vec2) => {
            let ppos = mapMgr.girdPos2pixPos(gpos);
            for (const dropitem of this.dropList) {
                if (dropitem.x == ppos.x && dropitem.y == ppos.y) {
                    return false;
                }
            }
            return true;
        }
        let isVaidCell = (gpos) => {
            if (gpos.y < 0 || gpos.y > this.stageData.mapInfo.length - 1) {
                return false;
            }
            if (gpos.x < 0 || gpos.x > this.stageData.mapInfo[gpos.y].length - 1) {
                return false;
            }
            return this.stageData.mapInfo[gpos.y][gpos.x] > 0;
        }
        if (isEmptyCell(gridpos) && isVaidCell(gridpos)) {
            return gridpos;
        }

        let range = 1;
        while (true) {
            for (let x = -range; x <= range; x ++) {
                for (let y = -range; y <= range; y ++) {
                    if (Math.abs(x) < range && Math.abs(y) < range) {
                        continue;
                    }
                    let tmppos = gridpos.add(cc.v2(x, y));
                    if ((isEmptyCell(tmppos) && isVaidCell(tmppos))) {
                        return tmppos;
                    }
                }
            }
            range++;
            if (range >= 8) {
                return null;
            }
        }
        return null;
    }

    flyDropItem() {
        for (let i = 0; i < this.dropList.length; i++) {
            let itemnode = this.dropList[i];
            let node = new cc.Node();
            let motionstreak = node.addComponent(cc.MotionStreak);
            motionstreak.texture = this.itemLight;
            motionstreak.stroke = 16;
            node.parent = itemnode;
            motionstreak.scheduleOnce(() => {
                motionstreak.fadeTime = 0.3;
            });
            let act = [], act2 = [];
            act[act.length] = cc.moveBy(0.2, 0, 20);
            let p1 = cc.v2(itemnode.x, itemnode.y);
            let p2 = cc.v2(itemnode.x + random(600) - 300, itemnode.y + random(500) - 300);
            let p3 = cc.v2(this.role.pixx, this.role.pixy);

            act[act.length] = cc.bezierTo(0.8, [p1, p2, p3]).easing(cc.easeOut(3));
            act2[act2.length] = cc.delayTime(0.6);
            act2[act2.length] = cc.callFunc(() => {
                itemnode.stopAllActions();
                if (i == this.dropList.length - 1) {
                    this.isFinish = true;
                }
            });
            itemnode.runAction(cc.sequence(act));
            itemnode.runAction(cc.sequence(act2));
        }
    }

    dropItem(itemlist: dropInfo[], gridpos: cc.Vec2) {
        for (const iteminfo of itemlist) {
            let pos = this.getEmptyCell(gridpos);
            if (pos == null) {
                console.log("Error: drop item too match");
                break;
            }
            let itemdata = itemMgr.getItemData(iteminfo.itemid);
            let node = new cc.Node();
            let sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = this.itemAtlas.getSpriteFrame(String(itemdata.icon));
            node.position = mapMgr.girdPos2pixPos(pos);
            node.parent = this.effectLayer.node;
            node.scale = 20 / sprite.spriteFrame.getRect().width;
            node.name = "pos:" + pos.x + "|" + pos.y;

            this.dropList.push(node);
        }
    }

    private checkDropItem() {
        if (this.isFinish) {
            let mainrole = playerMgr.mainRole;
            for (let i = 0; i < this.dropList.length; i++) {
                let itemnode = this.dropList[i];
                let angle = getAngle(itemnode.x, itemnode.y, mainrole.pixx, mainrole.pixy + 30);
                let topos = getNextPos(itemnode.position, 8, angle);
                itemnode.x = topos.x;
                itemnode.y = topos.y;
                if (Math.abs(itemnode.x - mainrole.pixx) < 30 &&
                    Math.abs(itemnode.y - 30 - mainrole.pixy) < 30) {
                    itemnode.destroy();
                    this.dropList.splice(i, 1);
                }
            }
        }
    }
}