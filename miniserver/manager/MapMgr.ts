export class StageData {
	stageid: number = 0;
	resid: number = 0;
	width: number = 0;
	height: number = 0;
	grid_width: number = 0;
	grid_height: number = 0;
	rows: number = 0;
	lines: number = 0;
	boss: boolean = false;
	name: string = "";
	startPos: { x: number, y: number } = { x: 0, y: 0 };
	trancePos: { tomap: number, x: number, y: number }[] = [];
	monster:[{monid:number, x:number, y: number}][] = [];
	mapInfo: number[][] = [];
}

export class MapData {
	mapId: number = 0;
	mapName: string = "";
	startStage: number = 0;
	stageList: StageData[] = [];
}

class MapMgr {
	private mapDatas: { [index: number]: MapData } = {};

	// async init() {
	//     let getRes = (await import("../common/gFunc")).getRes;
	//     let data = await getRes("/prop_data/prop_map", cc.JsonAsset);
	//     let json = data.json;
	//     this.mapDatas = json;
	// }

	async init() {
		let RootDir = (await import("../common/gFunc")).RootDir;
		let data = require(RootDir("../app/prop_data/prop_map"));
		this.mapDatas = data;
	}

	getMapData(mapid: number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(mapid: number, stageid: number): StageData|null {
		let mapdata = this.getMapData(mapid);
		if (mapdata) {
			return mapdata.stageList[stageid];
		}
		return null;
	}
}

let mapMgr = new MapMgr();
export default mapMgr;