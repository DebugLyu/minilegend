import playerMgr from "../../../manager/PlayerMgr";
import MainUITaskItem from "./MainUITaskItem";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/main/tasklayer")
export default class MainUITask extends cc.Component {
    @property(cc.Prefab)
    taskItem: cc.Prefab = null;

    @property(cc.Node)
    taskBg: cc.Node = null;

    start(){
        let tasks = playerMgr.mainData.tasks;
        for (const task of tasks) {
            let taskitem = cc.instantiate(this.taskItem);
            taskitem.parent = this.taskBg;

            let taskscript = taskitem.getComponent(MainUITaskItem);
            taskscript.setInfo(task.taskid);
        }
    }
}