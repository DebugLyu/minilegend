import { ActState, AttrIds } from "../common/G";

import PlayerCtr from "./PlayerCtr";
import MapMgr from "../manager/MapMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/Role")

export default class Role extends cc.Component {
    @property(PlayerCtr)
    role: PlayerCtr = null;

    update(dt) {
        if (this.role.state == ActState.IDLE) {
            return;
        }

        let len = this.role.model.attr[AttrIds.Speed] * dt;
        let xie = 0.75;
        let x = 0, y = 0;
        if (this.role.dir == 1) {
            x = y = -xie;
        } else if (this.role.dir == 2) {
            x = 0; y = -1;
        } else if (this.role.dir == 3) {
            x = xie; y = -xie;
        } else if (this.role.dir == 4) {
            x = -1; y = 0;
        } else if (this.role.dir == 6) {
            x = 1; y = 0;
        } else if (this.role.dir == 7) {
            x = -xie; y = xie;
        } else if (this.role.dir == 8) {
            x = 0; y = 1;
        } else if (this.role.dir == 9) {
            x = xie; y = xie;
        }
        let ppos = this.node.position;
        let apos = cc.v2(x * len, y * len);
        let npos = ppos.add(apos);




        let stagedata = MapMgr.getInstance().getStageData(this.role.model.mapid, this.role.model.stageid);
        if (stagedata) {
            // 先判断 下一点
            let nc_pos = MapMgr.pixPos2GirdPos(npos);
            let grid = stagedata.mapInfo[nc_pos.x][nc_pos.y];
            if (grid == 0) {
                console.log("bukezou 111111");
                
                apos = cc.v2(x * len, 0);
                npos = ppos.add(apos);

                nc_pos = MapMgr.pixPos2GirdPos(npos);
                grid = stagedata.mapInfo[nc_pos.x][nc_pos.y];

                if (grid < 1) {
                    console.log("bukezou 22222222");
                    apos = cc.v2(0, y * len);
                    npos = ppos.add(apos);

                    nc_pos = MapMgr.pixPos2GirdPos(npos);
                    grid = stagedata.mapInfo[nc_pos.x][nc_pos.y];
                    if(grid < 1){
                        console.log("bukezou 333333333");
                        npos = ppos;
                    }
                }
            }
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



        this.node.setPosition(npos);
    }
}