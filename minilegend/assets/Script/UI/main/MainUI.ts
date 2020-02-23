import LEvent from "../../common/EventListner";
import playerMgr from "../../manager/PlayerMgr";
import expMgr from "../../manager/ExpMgr";
import { MaxPower } from "../../common/G";

const { ccclass } = cc._decorator;

enum MainMenu {
    Role = 0,
    Task,
    Stage,
    Skill,
    Shop,
}

@ccclass
export default class MainUI extends cc.Component {

    curToggle: MainMenu = MainMenu.Stage;
    layerList: cc.Node[] = [];
    toggleList: cc.Toggle[] = [];

    eventids: { [x: string]: number } = {};

    start() {
        // 初始化界面
        this.init();
        // 注册角色属性监听
        this.regRoleListening();
    }

    // 初始化界面
    init() {
        let list = ["RoleLayer", "TaskLayer", "StageLayer", "SkillLayer","ShopLayer"];
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

    /**
     * 注册监听事件
     *  经验、等级 金币 元宝 等变化
     */
    regRoleListening() {
        let RoleDataChange = (...args: any[]) => {
            if (!cc.isValid(this.node)) {
                return;
            }
            let type = args[0];
            if (!type) {
                return;
            }
            if (type == "all" || type == "exp") {
                let expBar = cc.find("Canvas/Top/Exp/ExpBar").getComponent(cc.ProgressBar);
                let needexp = expMgr.getNeedExp(playerMgr.mainData.level);
                expBar.progress = playerMgr.mainData.exp / needexp;
            }
            if (type == "all" || type == "power") {
                let powerBar = cc.find("Canvas/Top/Power/PowerBar").getComponent(cc.ProgressBar);
                powerBar.progress = playerMgr.mainData.power / MaxPower;
            }
            if (type == "all" || type == "gold") {
                let goldLabel = cc.find("Canvas/Top/Gold/GoldBg/gold").getComponent(cc.Label);
                goldLabel.string = String(playerMgr.mainData.gold);
            }
            if (type == "all" || type == "coin") {
                let coinLabel = cc.find("Canvas/Top/Coin/CoinBg/coin").getComponent(cc.Label);
                coinLabel.string = String(playerMgr.mainData.coin);
            }
        }
        this.eventids["RoleDataChange"] = LEvent.on("RoleDataChange", RoleDataChange);
        RoleDataChange("all");
    }

    onDestroy() {
        // 注销事件
        for (const key in this.eventids) {
            const id = this.eventids[key];
            LEvent.off(key, id);
        }
    }

    /**
     * 显示标签页
     * @param page 页码
     */
    showPage(page: number) {
        // if (page == MainMenu.Shop) {
        //     this.toggleList[this.curToggle].isChecked = true;
        //     return;
        // }
        for (let i = 0; i < this.layerList.length; i++) {
            let layer = this.layerList[i];
            layer.active = i == page;
        }
        this.curToggle = page;
    }

    /**
     * 页签点击事件
     * @param toggle 页签
     */
    onToggleClicked(toggle) {
        let i = this.toggleList.indexOf(toggle);
        if (i == -1) {
            return;
        }
        this.showPage(i);
    }
}
