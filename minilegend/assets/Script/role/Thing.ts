export default class Thing {
    onlyid: number = 0;// 唯一id
    // 地图坐标
    mapid: number = 0;
    x: number = 0;
    y: number = 0;

    // 场景实物脚本
    control: any = null;

    /**
     *
     */
    constructor(control?) {
        if(control != null){
            this.control = control;
        }
        this.init();
    }

    init(){

    }
    
    setControl(control) {
        this.control = control;
    }
}
