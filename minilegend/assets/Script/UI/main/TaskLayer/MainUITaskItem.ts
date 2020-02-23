import taskMgr from "../../../manager/TaskMgr";
import UIItem from "../../item/UIItem";
import itemMgr from "../../../manager/ItemMgr";
import Llog from "../../../common/LLog";
import { Net } from "../../../net/net";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/taskitem")
export default class MainUITaskItem extends cc.Component {
    @property(cc.Prefab)
    rewardNode: cc.Prefab = null;

    taskId: number = 0;
    // 任务名称
    nameLabel: cc.Label = null;
    // 任务介绍
    infoLabel: cc.Label = null;
    itemBg: cc.Node = null;

    onLoad() {
        this.initnode();
    }

    initnode() {
        this.nameLabel = cc.find("name", this.node).getComponent(cc.Label);
        this.infoLabel = cc.find("taskinfo", this.node).getComponent(cc.Label);
        this.itemBg = cc.find("ItemList", this.node);
        cc.find("start", this.node).on("click", this.startTask, this);
    }

    setInfo(taskid: number){
        let taskdata = taskMgr.getTaskData(taskid);
        if(!taskdata){
            this.node.destroy();
            return;
        }
        this.taskId = taskid;
        this.nameLabel.string = taskdata.name;
        this.infoLabel.string = taskdata.info;

        for(const reward of taskdata.reward){
            let itemid = reward[0];
            let num = reward[1];
            let node = cc.instantiate(this.rewardNode);
            let uiitem = node.getComponent(UIItem);
            let itemdata = itemMgr.getItemData(itemid);
            if(!itemdata){
                Llog.error("找不到物品信息", itemid);
                continue;
            }
            uiitem.setIcon(itemdata.icon);
            uiitem.num = num;

            node.parent = this.itemBg;
        }
    }

    startTask(){
        if(this.taskId == 0){
            return;
        }
        Net.startTask({taskid: this.taskId});
    }
}