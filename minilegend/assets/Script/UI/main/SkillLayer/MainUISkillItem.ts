import skillMgr from "../../../manager/SkillMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/skillitem")
export default class MainUISkillItem extends cc.Component {
    skillid: number = 0;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    get skillname(){
        return this.nameLabel ? this.nameLabel.string : "";
    }
    set skillname(n: string){
        this.nameLabel && (this.nameLabel.string = n);
    }

    @property(cc.Label)
    levelLabel:cc.Label = null;

    _level: number = 0;
    get level () {
        return this._level;
        // return this.levelLabel ? this.levelLabel.string : "";
    }
    set level(n: number) {
        this.levelLabel && (this.levelLabel.string = "Lv." + n);
        this._level = n;
    }

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    set icon(n: string) {
        if(this.skillid == 0){
            return;
        }
        let skilldata = skillMgr.getSkillData(this.skillid);
        if (!skilldata){
            return;
        }
        let sf = skillMgr.getSkillIconSpriteFrame(skilldata.icon);
        this.iconSpr.spriteFrame = sf;
    }

    @property(cc.Node)
    selectNode: cc.Node = null;

    get select () {
        return this.selectNode && this.selectNode.active;
    }

    set select(n :boolean){
        this.selectNode && (this.selectNode.active = n);
    }
}