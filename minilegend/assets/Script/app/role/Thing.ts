let ThingOnlyIdSeed = 10000;

export default class Thing {
    onlyid: number = 0;// 唯一id 服务器获取
    seedid: number = 0; // 序列id 客户唯一
    // 地图坐标
    mapid: number = 0;
    stageid: number = 0;
    x: number = 0;
    y: number = 0;

    constructor() {
        ThingOnlyIdSeed++;
        this.seedid = ThingOnlyIdSeed;
    }

    init(){
        
    }
}
