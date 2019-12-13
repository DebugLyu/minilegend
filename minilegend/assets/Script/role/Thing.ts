export default class thing {
    onlyid: number = 0;// 唯一id
    // 地图坐标
    mapid: number = 0;
    x: number = 0;
    y: number = 0;

    // 场景实物脚本
    control: cc.Component = null;

    constructor(control: cc.Component = null) {
        if (control != null) {
            this.setControl(control);
        }
    }

    setControl(control: cc.Component) {
        this.control = control;
    }

    setMap(mapid: number) {
        this.mapid = mapid;
    }
}
