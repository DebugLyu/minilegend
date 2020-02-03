const { ccclass, property } = cc._decorator;

enum MainMenu {
    Role = 0,
    Forge,
    Stage,
    Skill,
    Active,
}

@ccclass
export default class NewClass extends cc.Component {
    curToggle: MainMenu = MainMenu.Stage;
    
    layerList: cc.Node[] = [];
    toggleList: cc.Toggle[] = [];

    start() {
        let list = ["RoleLayer", "ForgeLayer", "StageLayer", "SkillLayer"];
        let mid = cc.find("Canvas/Mid");
        for (let i = 0; i < list.length; i++) {
            let layerName = list[i];
            let layer = mid.getChildByName(layerName);
            layer.active = i == this.curToggle;
            this.layerList.push(layer);
        }

        for (let i = 0; i < 5; i++) {
            let toggle = cc.find("Canvas/Bottom/MainContorBtn/toggle" + (i + 1)).getComponent(cc.Toggle);
            toggle.isChecked = i == this.curToggle;
            toggle.node.on("toggle", this.onToggleClicked, this);
            this.toggleList.push(toggle);
        }
    }

    showPage(page: number) {
        if (page == MainMenu.Forge || page == MainMenu.Skill || page == MainMenu.Active) {
            this.toggleList[this.curToggle].isChecked = true;
            return;
        }
        for (let i = 0; i < this.layerList.length; i++) {
            let layer = this.layerList[i];
            layer.active = i == page;
        }
        this.curToggle = page;
    }

    onToggleClicked(toggle) {
        let i = this.toggleList.indexOf(toggle);
        if (i == -1) {
            return;
        }
        this.showPage(i);
    }
}
