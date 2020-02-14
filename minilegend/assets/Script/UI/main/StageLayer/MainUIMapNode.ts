
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/mapnode")
export default class MainUIMapNode extends cc.Component {
    @property(cc.Label)
    mapNameLabel: cc.Label = null;

    get mapName() {
        return this.mapNameLabel?this.mapNameLabel.string : "";
    }

    set mapName(n: string){
        this.mapNameLabel && (this.mapNameLabel.string = n);
    }
}