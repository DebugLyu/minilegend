import { Gird } from "../common/G";
import { getRes, safeJson } from "../common/gFunc";

export interface PlatData {
	platid: number;
	resid: number;
	width: number;
	height: number;
	grid_width: number;
	grid_height: number;
	rows: number;
	lines: number;
	boss: boolean;
	name: string;
	startPos: { x: number, y: number };
	trancePos: { tomap: number, x: number, y: number }[];
	monster: [{ monid: number, x: number, y: number }][];
	mapInfo: number[][];
}

export interface StageData {
	id: number;
	name: string;
	bg: string;
	plat: number;
	platnum: number;
	droplist: number[];
}

export interface MapData {
	id: number;
	name: string;
	stage: number[];
}

class MapMgr {
	private mapDatas: { [index: number]: MapData } = {};
	private stageDatas: { [index: number]: StageData } = {};
	private platDatas: { [index: number]: PlatData } = {};


	async init() {
		let data = await getRes("/prop_data/prop_map", cc.JsonAsset);
		let json = data.json;
		for (const mapid in json) {
			if (json.hasOwnProperty(mapid)) {
				const mapdata = json[mapid];
				mapdata.stage = safeJson(mapdata.stage);
			}
		}
		this.mapDatas = json;

		let stagedata = await getRes("/prop_data/prop_stage", cc.JsonAsset);
		let stagejson = stagedata.json;
		this.stageDatas = stagejson;
	}

	// async init() {
	// 	let RootDir = (await import("../common/gFunc")).RootDir;
	// 	let data = require(RootDir("../app/prop_data/prop_map"));
	// 	this.mapDatas = data;
	// }

	getAllMapData() {
		return this.mapDatas;
	}

	getMapData(mapid: number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(stageid: number): StageData {
		return this.stageDatas[stageid];
	}

	async getPlatData(platid: number): Promise<PlatData> {
		if (this.platDatas[platid]) {
			return this.platDatas[platid];
		}

		let platdata = await getRes("/prop_data/plats/plat_" + platid, cc.JsonAsset);
		if (platdata) {
			return platdata.json;
		}

		return null;;
	}

	pixPos2GirdPos(pixpos: cc.Vec2): cc.Vec2 {
		return cc.v2(Math.floor(pixpos.x / Gird.width), Math.floor(pixpos.y / Gird.height));
	}

	girdPos2pixPos(girdpos: cc.Vec2): cc.Vec2 {
		return cc.v2(girdpos.x * Gird.width, girdpos.y * Gird.height);
	}

	girdX2PixX(x: number): number {
		return x * Gird.width;
	}

	girdY2PixY(y: number): number {
		return y * Gird.height;
	}

	pixX2GirdX(x: number) {
		return Math.floor(x / Gird.width)
	}

	pixY2GirdY(y: number) {
		return Math.floor(y / Gird.height)
	}
}

let mapMgr = new MapMgr();
export default mapMgr;