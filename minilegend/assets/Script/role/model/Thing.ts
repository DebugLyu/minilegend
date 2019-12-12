export default class thing {
    onlyid: number = 0;// 唯一id
    // 地图坐标
    mapid: number = 0;
    x: number = 0;
    y: number = 0;

    // 场景实物
    avatar: cc.Node = null;

    constructor(avatar: cc.Node = null) {
        if (avatar != null) {
            this.setAvatar(avatar);
        }
    }

    setAvatar(avatar: cc.Node) {
        this.avatar = avatar;
    }

    setMap(mapid: number) {
        this.mapid = mapid;
    }
}
