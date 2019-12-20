import { ActState, AttrIds, LivingType } from "../common/G";
import MapMgr from "../manager/MapMgr";
import Stage from "../map/Stage";
import WarriorCtr from "./WarriorCtr";
import WeaponCtr from "./weaponCtr";
import LivingMod from "./LivingMod";
import ObjectMgr from "../manager/ObjectMgr";
import { degree2Dir } from "../common/gFunc";
import WarriorMod from "./WarriorMod";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/Role")
export default class Role extends cc.Component {
    private _x: number;
    public get x(): number {
        return this._x;
    }
    public set x(v: number) {
        this._x = v;
        this.node.x = MapMgr.girdX2PixX(v);
    }

    private _y: number;
    public get y(): number {
        return this._y;
    }
    public set y(v: number) {
        this._y = v;
        this.node.y = MapMgr.girdY2PixY(v)
    }

    public get pixx(): number {
        return this.node.x;
    }
    public set pixx(v: number) {
        this.node.x = v;
        this._x = MapMgr.pixX2GirdX(v);
    }

    public get pixy(): number {
        return this.node.y;
    }
    public set pixy(v: number) {
        this.node.y = v;
        this._y = MapMgr.pixY2GirdY(v);
    }

    weapon: WeaponCtr = null;
    warrior: WarriorCtr = null;
    model: WarriorMod = null;
    stage: Stage = null;
    aiTimer: number = 0;
    aiDo: number = 0;
    param: any = null;
    // 目标
    target: Role = null;

    onLoad() {
        this.stage = this.node.parent.getComponent(Stage);
        this.warrior = this.node.getChildByName("rolectr").getComponent(WarriorCtr);
        this.model = this.warrior.model;
        let node = this.node.getChildByName("weapon");
        this.weapon = node.getComponent(WeaponCtr);
        this.weapon.resId = 0;
    }

    start() {

    }

    getWarrior(): WarriorCtr {
        return this.warrior;
    }

    enterStage(mapid: number, stageid: number) {
        this.model.mapid = mapid;
        if (this.model.stageid == stageid) {
            return;
        }

        let mapdata = MapMgr.instance.getMapData(this.model.mapid);
        let stagedata = mapdata.stageList[stageid];
        if (stagedata) {
            this.model.stageid = stageid;
            let pos = MapMgr.girdPos2pixPos(cc.v2(stagedata.startPos.x, stagedata.startPos.y));
            this.node.setPosition(pos);
        }
    }

    findTarget(targettype: LivingType): Role {
        let list: Role[] = [];
        let objlist = ObjectMgr.instance.objectList;
        for (const _ in objlist) {
            if (objlist.hasOwnProperty(_)) {
                const role = objlist[_];
                if (role.warrior.model.livingType == targettype) {
                    let len = cc.v2(this.x, this.y).sub(cc.v2(role.x, role.y)).mag();
                    role.param = len;
                    list.push(role);
                }
            }
        }

        if (list.length == 0) {
            return null;
        }
        if (list.length == 1) {
            return list[0];
        }

        list.sort((a, b) => {
            return a.param - b.param;
        });

        return list[0];
    }

    aiMoveToTarget() {
        var degree = Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;
        if (degree < 0) {
            degree = 360 + degree;
        }
        console.log("degree", degree);

        this.warrior.move(degree2Dir(degree));
    }

    checkPos(dt) {
        if (this.warrior.state == ActState.IDLE) {
            return;
        }

        let len = this.model.attr[AttrIds.Speed] * dt;
        let xie = 0.75;
        let x = 0, y = 0;
        if (this.warrior.dir == 1) {
            x = y = -xie;
        } else if (this.warrior.dir == 2) {
            x = 0; y = -1;
        } else if (this.warrior.dir == 3) {
            x = xie; y = -xie;
        } else if (this.warrior.dir == 4) {
            x = -1; y = 0;
        } else if (this.warrior.dir == 6) {
            x = 1; y = 0;
        } else if (this.warrior.dir == 7) {
            x = -xie; y = xie;
        } else if (this.warrior.dir == 8) {
            x = 0; y = 1;
        } else if (this.warrior.dir == 9) {
            x = xie; y = xie;
        }
        let ppos = this.node.position;
        let apos = cc.v2(x * len, y * len);
        let npos = ppos.add(apos);
        let grid = 0;

        while (true) {
            let stagedata = MapMgr.instance.getStageData(this.model.mapid, this.model.stageid);
            if (!stagedata) {
                break;
            }
            let tryxy = (tx: number = 0, ty: number = 0) => {
                apos = cc.v2(tx, ty);
                npos = ppos.add(apos);
                let tnc_pos = MapMgr.pixPos2GirdPos(npos);

                grid = stagedata.mapInfo[tnc_pos.y][tnc_pos.x];
                if (grid > 0) {
                    return true;
                }
                return false;
            }
            // 先判断 下一点 是否超界
            let nc_pos = MapMgr.pixPos2GirdPos(npos);
            let y_ckecn = false, x_check = false;
            if (nc_pos.y < 0 || nc_pos.y >= stagedata.mapInfo.length) {
                nc_pos.y = stagedata.mapInfo.length - 1;
                y_ckecn = true;
            }
            if ((nc_pos.x < 0 || nc_pos.x >= stagedata.mapInfo[nc_pos.y].length)) {
                x_check = true;
            }
            // y轴超界 判断x轴
            if (y_ckecn && !x_check && tryxy(x * len, 0)) {
                break;
            }
            // x轴超界 判断y轴
            if (x_check && !y_ckecn && tryxy(0, y * len)) {
                break;
            }
            // xy 同时超界 直接跳出
            if (x_check && y_ckecn) {
                npos = ppos;
                break;
            }
            // 不超界的情况下，判断是否可走
            grid = stagedata.mapInfo[nc_pos.y][nc_pos.x];
            if (grid > 0) {
                break;
            }
            if (tryxy(x * len, 0)) {
                break;
            }
            if (tryxy(0, y * len)) {
                break;
            }
            npos = ppos;
            break;
        }

        if (npos.x < 0) {
            npos.x = 0;
        } else if (npos.x > this.node.parent.width) {
            npos.x = this.node.parent.width;
        } else if (npos.y < 0) {
            npos.y = 0;
        } else if (npos.y > this.node.parent.height) {
            npos.y = this.node.parent.height;
        }

        if (grid == 1) {
            this.node.opacity = 255;
        } else if (grid == 2) {
            this.node.opacity = 100;
        }

        this.node.setPosition(npos);
        let gridpos = MapMgr.pixPos2GirdPos(npos);
        this._x = gridpos.x;
        this._y = gridpos.y;
    }

    AiAction(dt) {
        if (this.model.livingType != LivingType.MONSTER) {
            return;
        }
        this.aiTimer += dt;
        let dotime = Math.floor(this.aiTimer);
        if (dotime != this.aiDo) {
            this.aiDo = dotime;
            if (this.target == null) {
                let target = this.findTarget(LivingType.PLAYER);
                this.target = target;
            }

            if (this.target == null) {
                this.warrior.idle();
                return;
            }

            let skill = this.model.aiSkill(cc.v2(this.target.x, this.target.y));
            if (skill == null) {
                this.aiMoveToTarget();
                return;
            }
            let skillinfo = skill.getatk(this.model.attr);

            let angle = cc.v2(this.x, this.y).signAngle(cc.v2(this.target.x, this.target.y));
            let degree = angle / Math.PI * 180;
            if (degree < 0) {
                degree = 360 + degree;
            }
            let dir = degree2Dir(degree);
            this.warrior.attack(dir);
            this.target.model.behit(skillinfo);
            skill.do();
        }
    }

    update(dt) {
        this.checkPos(dt);
        this.AiAction(dt);
    }
}