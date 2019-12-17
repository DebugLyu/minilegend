export default class Thing {
    onlyid: number = 0;// 唯一id
    // 地图坐标
    mapid: number = 0;
    x: number = 0;
    y: number = 0;

    // 场景实物脚本
    _control: any = null;

    /**
     *
     */
    constructor(control?) {
        if(control != null){
            this._control = control;
        }
        this.init();
    }

    init(){

    }
    
    setControl(control) {
        this._control = control;
    }

    setMap(mapid: number) {
        this.mapid = mapid;
    }
}
