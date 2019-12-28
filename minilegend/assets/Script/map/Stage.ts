import MapMgr, { MapData, StageData } from "../manager/MapMgr";
import { ActState, Cell, LivingType } from "../common/G";
import Role from "../role/Role";
import { getMapSpr, getAnimation } from "../common/gFunc";
import PlayerMgr from "../manager/PlayerMgr";
import EffectLayer from "./EffectLayer";
import MonsterMgr from "../manager/MonsterMgr";

const { ccclass, property, menu } = cc._decorator;
let RootPos: cc.Vec2 = cc.Vec2.ZERO;
let OutRand = 1;

@ccclass
@menu("map/stage")
export default class Stage extends cc.Component {
    nodeArray: cc.Node[][] = [];
    mapId: number = 0;
    stageId: number = 0;
    // 副本数据
    mapData: MapData = null;
    stageData: StageData = null;
    effectLayer: EffectLayer = null;

    // 主角色
    role: Role = null;
    // 角色列表
    roleList: { [key: number]: Role } = {};
    get isBossStage(): boolean {
        return this.stageData.boss;
    }
    // 关卡 怪物波次
    wave: number = 0;
    // 当前关卡是否完成
    get isFinish(): boolean {
        return this.wave == this.stageData.monster.length && this.wave == this.stageData.monster.length;
    }

    transportList: { [key: number]: cc.Rect } = {};

    @property(cc.Node)
    passStage: cc.Node = null;

    start() {
        this.role = PlayerMgr.instance.mainRole;

        this.effectLayer = this.node.getChildByName("EffectLayer").getComponent(EffectLayer);

        RootPos = cc.v2(-cc.winSize.width / 2, -cc.winSize.height / 2);

        cc.game.on("RoleDie", this.onRoleDie, this);
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

        for (const onlyid in this.roleList) {
            if (this.roleList.hasOwnProperty(onlyid)) {
                const role = this.roleList[onlyid];
                if (PlayerMgr.instance.isMainRole(role.model.onlyid)) {
                    role.x = -1;
                    role.y = -1;
                }else{
                    this.effectLayer.delRoleEx(role.model.onlyid);
                    role.clean(true);
                }
            }
        }
        this.roleList = {};
    }

    loadMap(mapid: number): void {
        this.mapId = mapid;
        this.mapData = MapMgr.instance.getMapData(mapid);
        this.loadStage(this.mapData.startStage);
    }

    loadStage(stageid: number) {
        this.clearStage();
        this.stageId = stageid;
        this.stageData = this.mapData.stageList[stageid];

        this.node.setPosition(RootPos);
        this.roleEnter(this.role);
        this.checkPlayerPos();
        this.checkMapNode();
        this.wave = 0;
        this.checkWave();
    }

    getMonsterNum(): number {
        let n = 0;
        for (const onlyid in this.roleList) {
            if (this.roleList.hasOwnProperty(onlyid)) {
                const role = this.roleList[onlyid];
                if (role.model.livingType == LivingType.MONSTER) {
                    n++;
                }
            }
        }
        return n;
    }

    nextWave() {
        let monsterlist = this.stageData.monster[this.wave - 1];
        for (const moninfo of monsterlist) {
            MonsterMgr.instance.genMonster(moninfo.monid, this, moninfo.x, moninfo.y);
        }
    }

    checkWave() {
        if (this.getMonsterNum() > 0) {
            return;
        }
        if (this.wave == this.stageData.monster.length) {
            if(this.isBossStage){
                // TODO 过关
                this.onPassStage();
                return;
            }
            this.addTransport();
            return;
        }
        setTimeout(() => {
            this.wave++;
            this.nextWave();
        }, 3 * 1000);
    }

    roleEnter(role: Role) {
        role.enterStage(this.mapId, this.stageId);
        this.roleList[role.model.onlyid] = role;

        if(this.role.model.onlyid == role.model.onlyid){
            this.role.x = this.stageData.startPos.x;
            this.role.y = this.stageData.startPos.y;
        }
    }

    roleExit(role: number | Role) {
        let onlyid = 0;
        if (typeof role === "number") {
            onlyid = role;
        }
        if (role instanceof Role) {
            onlyid = role.model.onlyid;
        }
        let r = this.roleList[onlyid];
        if (r) {
            delete this.roleList[onlyid];
        }
    }


    update(dt) {
        if(this.mapData == null){
            return;
        }

        this.checkTransport();
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


    checkTransport() {
        if (this.isFinish) {
            for (const stageid in this.transportList) {
                let trrect = this.transportList[stageid];
                if (trrect.contains(cc.v2(this.role.x, this.role.y))) {
                    this.loadStage(Number(stageid));
                    return;
                }
            }
        }
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
            node.position = MapMgr.girdPos2pixPos(cc.v2(tinfo.x, tinfo.y));
            this.transportList[tinfo.tomap] = cc.rect(tinfo.x, tinfo.y, 3, 5);
        }
    }

    checkPlayerPos() {
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

    async checkMapNode() {
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

    onRoleDie(role: Role) {
        this.effectLayer.delRoleEx(role.model.onlyid);
        this.roleExit(role);
        if (role.model.livingType == LivingType.MONSTER) {
            this.checkWave();
        }
    }

    onPassStage(){
        this.passStage.active = true;
    }
}