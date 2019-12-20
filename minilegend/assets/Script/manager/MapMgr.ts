import { Gird } from "../common/G";

export class StageData {
	stageid: number = 0;
	resid: number = 0;
	width: number = 0;
	height: number = 0;
	grid_width: number = 0;
	grid_height: number = 0;
	rows: number = 0;
	lines: number = 0;
	name: string = "";
	startPos: { x: number, y: number } = { x: 0, y: 0 };
	trancePos: { tomap: number, x: number, y: number }[] = [];
	mapInfo: number[][] = [];
}

export class MapData {
	mapId: number = 0;
	mapName: string = "";
	startStage: number = 0;
	stageList: StageData[] = [];
}

export default class MapMgr {
	private static _instance: MapMgr = null
	public static get instance(): MapMgr {
		if (this._instance == null) {
			this._instance = new MapMgr();
		}
		return this._instance;
	}

	private mapDatas: { [index: number]: MapData } = {};

	init() {
		cc.loader.loadRes("prop_data/prop_map", cc.JsonAsset, (error: Error, resource) => {
			this.mapDatas = resource.json;
		});
	}


	getMapData(mapid: number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(mapid: number, stageid: number): StageData {
		let mapdata = this.getMapData(mapid);
		if (mapdata) {
			return mapdata.stageList[stageid];
		}
		return null;
	}

	public static pixPos2GirdPos(pixpos: cc.Vec2): cc.Vec2 {
		return cc.v2(Math.floor(pixpos.x / Gird.width), Math.floor(pixpos.y / Gird.height));
	}

	public static girdPos2pixPos(girdpos: cc.Vec2): cc.Vec2 {
		return cc.v2(girdpos.x * Gird.width, girdpos.y * Gird.height);
	}

	public static girdX2PixX(x: number): number {
		return x * Gird.width;
	}

	public static girdY2PixY(y: number): number {
		return y * Gird.height;
	}

	public static pixX2GirdX(x: number) {
		return Math.floor(x / Gird.width)
	}

	public static pixY2GirdY(y: number) {
		return Math.floor(y / Gird.height)
	}
}