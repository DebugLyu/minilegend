export default class Thing<T> {
    onlyid: number = 0;// 唯一id
    // 地图坐标
    mapid: number = 0;
    x: number = 0;
    y: number = 0;

    // 场景实物脚本
    control: T = null;

    /**
     *
     */
    constructor(control?:T) {
        if(control != null){
            this.control = control;
        }
    }
    
    setControl(control: T) {
        this.control = control;
    }

    setMap(mapid: number) {
        this.mapid = mapid;
    }
}
