import { TaskData } from "../../manager/TaskMgr";
import Item from "../item/Item";
import { safeJson } from "../../common/gFunc";

export default class Task {
    taskid: number = 0;
    
    taskdata: TaskData = null;

    startTime: number = 0;
    leftTimes: number = 0;
    addStartTime: number = 0;

    nowtime(){
        return Date.now() / 1000;
    }

    isFinish(){
        let now = this.nowtime();
        let isfinish = now > (this.startTime + this.taskdata.time)
        return isfinish;
    }

    start(){
        let now = this.nowtime();
        this.startTime = now;
    }

    getReward(): Item[] | null {
        if(!this.isFinish()){
            return null;
        }

        let list:Item[] = [];
        for (let i = 0; i < this.taskdata.reward.length; i++) {
            const reward = this.taskdata.reward[i];
            let itemid = reward[0];
            let num = reward[1];
            let item = new Item();
            item.itemid = itemid;
            item.init();
            item.num = num;
            list.push(item);
        }

        return list;
    }

    fromJson(json: any) {
        for (const key in json) {
            this[key] = safeJson(json[key]);
        }
    }
}