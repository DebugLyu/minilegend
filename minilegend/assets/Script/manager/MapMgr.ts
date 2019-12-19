import { Cell } from "../common/G";

export class StageData {
	stageid: number = 0;
	resid:number = 0;
	width:number = 0;
	height:number = 0;
	grid_width:number = 0;
	grid_height:number = 0;
	rows:number = 0;
	lines:number = 0;
	name:string = "";
	startPos: { x:number, y:number} = {x :0, y :0};
	trancePos:{ tomap:number, x:number, y:number } [] = [];
	mapInfo:number [][] = [];
}

export class MapData{
	mapId: number = 0;
	mapName: string = "";
	startStage: number = 0;
	stageList: StageData[] = [];
}

export default class MapMgr {
	private static instance: MapMgr = null
	public static getInstance(): MapMgr {
		if (this.instance == null) {
			this.instance = new MapMgr();

		}
		return this.instance;
	}

	private mapDatas = new Map<number, MapData>(); //{ [index: number]: MapData } = {};

	init() {
		cc.loader.loadRes("prop_data/prop_map", cc.JsonAsset, (error: Error, resource) => {
			this.mapDatas = resource.json;
		});
	}


	getMapData(mapid:number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(mapid:number, stageid:number): StageData {
		let mapdata = this.getMapData(mapid);
		if(mapdata){
			return mapdata.stageList[stageid];
		}
		return null;
	}

	public static pixPos2GirdPos(pixpos: cc.Vec2): cc.Vec2{
		let x = Math.floor(pixpos.x / Cell.width);
		let y = Math.floor(pixpos.y / Cell.height);
		return cc.v2(x, y);
	}

	public static GirdPos2pixPos(girdpos: cc.Vec2): cc.Vec2{
		return cc.v2(girdpos.x * Cell.width, girdpos.y * Cell.height);
	}
}