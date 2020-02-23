import skillMgr from "../../../manager/SkillMgr";
import MainUISkillItem from "./MainUISkillItem";
import playerMgr from "../../../manager/PlayerMgr";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/skilllayer")
export default class MainUISkill extends cc.Component {
    @property(cc.Prefab)
    skillItemPrefab: cc.Prefab = null;
    @property(cc.Node)
    skillNodeBg: cc.Node = null;

    start() {
        setTimeout(() => {
            this.initnode();
        }, 0);
    }

    initnode(){
        let skills = skillMgr.getAllSkills();
        let curskills = playerMgr.mainData.skills;

        let bg_width = this.skillNodeBg.width;
        let node_width = this.skillItemPrefab.data.width * cc.winSize.width / 640;
        let layout = this.skillNodeBg.getComponent(cc.Layout);
        let spacing = layout.spacingX;
        let wn = 4;
        let padding = (bg_width - wn * (node_width + spacing)) / 2 + 10;
        layout.paddingLeft = padding;
        for (const key in skills) {
            const skilldata = skills[key];
            let node = cc.instantiate(this.skillItemPrefab);
            node.parent = this.skillNodeBg;
            node.active = true;

            let uiskillitem = node.getComponent(MainUISkillItem);
            uiskillitem.skillid = skilldata.skillid;
            uiskillitem.skillname = skilldata.name;
            uiskillitem.level = 1;
            uiskillitem.icon = skilldata.icon;
            uiskillitem.select = false;

            node.scale = cc.winSize.width / 640;
        }
    }

    test() {
        let skillitem = cc.find("skillba/skillicon", this.node);
        for (let i = 0; i < 12; i++) {
            let node = cc.instantiate(skillitem);
            node.active = true;

            node.parent = skillitem.parent;

        }
    }
}