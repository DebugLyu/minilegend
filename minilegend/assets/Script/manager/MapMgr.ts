
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
	map_info:number [][] = [];
}

export class MapData{
	mapId: number = 0;
	mapName: string = "";
	startStage: number = 0;
	stageList: StageData[] = [];

	getStageData(stageid: number): StageData {
		return this.stageList[stageid];
	}
}

export default class MapMgr {
	private static instance: MapMgr = null
	public static getInstance(): MapMgr {
		if (this.instance == null) {
			this.instance = new MapMgr();

		}
		return this.instance;
	}

	private _map_data = new Map<number, MapData>(); //{ [index: number]: MapData } = {};

	init() {
		cc.loader.loadRes("prop_data/prop_stage", cc.JsonAsset, (error: Error, resource) => {
			this._map_data = resource.json;
		});
	}


	getMapData(mapid:number): MapData {
		return this._map_data[mapid];
	}

	getStageData(mapid:number, stageid:number): StageData {
		let mapdata = this.getMapData(mapid);
		if(mapdata){
			return mapdata.stageList[stageid];
		}
		return null;
	}
}