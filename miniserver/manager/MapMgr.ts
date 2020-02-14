import { RootDir } from "../common/gFunc";

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
	startplat:number;
	platnum:number;
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


	// async init() {
	//     let data = await getRes("/prop_data/prop_map", cc.JsonAsset);
	// 	let json = data.json;
	// 	let stagedata = await getRes("/prop_data/prop_stage", cc.JsonAsset);
	// 	let stagejson = stagedata.json;
	// 	this.stageDatas = stagejson;
	//     this.mapDatas = json;
	// }

	init() {
		let data = require(RootDir("../app/prop_data/prop_map"));
		this.mapDatas = data;
		let stagedata = require(RootDir("../app/prop_data/prop_stage"));
		this.stageDatas = stagedata;
	}

	getAllMapData() {
		return this.mapDatas;
	}

	getMapData(mapid: number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(stageid: number): StageData {
		return this.stageDatas[stageid];
	}

	getPlatData(platid: number): PlatData | null {
		let data = require(RootDir("../app/prop_data/plats/plat_" + platid));
		return data;
	}
}

let mapMgr = new MapMgr();
export default mapMgr;