import mapMgr from "../../../manager/MapMgr";
import playerMgr from "../../../manager/PlayerMgr";
import { StartMapStage } from "../../../common/G";
import UIStageNode from "./UIStageNode";
import MainUIMapNode from "./MainUIMapNode";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/stagelayer")
export default class MainUIStage extends cc.Component {
    @property(cc.Node)
    stageNodeView: cc.Node = null;
    @property(cc.Node)
    mapNodeView: cc.Node = null;

    @property(cc.Prefab)
    mapPrefab:cc.Prefab = null;
    
    @property(cc.Prefab)
    stagePrefab: cc.Prefab = null;

    pageList:number[] = [];

    start(){
        this.regEventLisner();
        this.initMapNode();

        let mapid = playerMgr.mainData.maxMap;
        this.showMapStage(mapid);
    }

    regEventLisner(){
        let pageview = cc.find("MapPage", this.node);
        pageview.on('scroll-ended', this.onPageChange, this);
    }

    onPageChange(pageview: cc.PageView){
        let index = pageview.getCurrentPageIndex();
        if(index < 0){
            return;
        }
        let mapid = this.pageList[index];
        this.showMapStage(mapid);
    }

    initMapNode(){
        let mapdatas = mapMgr.getAllMapData();
        for (const mapid in mapdatas) {
            const mapdata = mapdatas[mapid];
            let mapnode = cc.instantiate(this.mapPrefab);
            let mmn = mapnode.getComponent(MainUIMapNode);
            mmn.mapName = mapdata.name;
            // mapnode.name = String(mapdata.id);
            this.pageList.push(mapdata.id);
            mapnode.parent = this.mapNodeView;
        }
    }

    showMapStage(mapid: number){
        if(mapid == 0){
            mapid = StartMapStage.map;
        }
        let stageid = playerMgr.mainData.maxStage;
        if(stageid == 0){
            stageid = StartMapStage.stage;
        }

        let mapdata = mapMgr.getMapData(mapid);
        for(let stageid of mapdata.stage){
            let stagedata = mapMgr.getStageData(stageid);
            let stagenode = cc.instantiate(this.stagePrefab);
            let uisn = stagenode.getComponent(UIStageNode);
            uisn.stageName = stagedata.name;
            uisn.setBackgroud(stagedata.bg);
            stagenode.parent = this.stageNodeView;
        }
    }
}
