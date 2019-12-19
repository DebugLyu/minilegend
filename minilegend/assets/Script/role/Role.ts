import { ActState, AttrIds } from "../common/G";
import PlayerCtr from "./PlayerCtr";
import MapMgr from "../manager/MapMgr";
import Stage from "../map/Stage";
import WarriorCtr from "./WarriorCtr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/Role")
export default class Role extends cc.Component {
    @property(WarriorCtr)
    warrior: WarriorCtr = null;

    @property(Stage)
    stage: Stage = null;


    enterMap(mapid?: number) {
        this.warrior.model.mapid = mapid;
        this.stage.loadMap(mapid, true);
        // this.enterStage
    }

    enterStage(stageid: number) {
        if (this.warrior.model.stageid == stageid) {
            return;
        }

        let mapdata = MapMgr.getInstance().getMapData(this.warrior.model.mapid);
        let stagedata = mapdata.stageList[stageid];
        if (stagedata) {
            this.warrior.model.stageid = stageid;
            let pos = MapMgr.GirdPos2pixPos(cc.v2(stagedata.startPos.x, stagedata.startPos.y));
            this.node.setPosition(pos);

            this.stage.loadStage(stageid);
        }
    }

    update(dt) {
        if (this.warrior.state == ActState.IDLE) {
            return;
        }

        let len = this.warrior.model.attr[AttrIds.Speed] * dt;
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
            let stagedata = MapMgr.getInstance().getStageData(this.warrior.model.mapid, this.warrior.model.stageid);
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
    }
}