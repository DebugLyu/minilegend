export interface TaskData {
    id: number,         // 任务id 
    name: string,        //  任务名字
    mapid: number,      //  地图id
    info: string,        //  任务简介
    reward: [],     //  任务奖励
    rand: [],       //  随机奖励
    time: number,       //  完成用时（秒）
    maxtimes: number,       //  最大累计次数
    addtime: number,        //  增加累计时间
}

class TaskMgr {
    taskList: { [x: number]: TaskData } = {};
    // async init() {
    //     let getRes = (await import("../common/gFunc")).getRes;
    //     let data = await getRes("/prop_data/prop_task", cc.JsonAsset);
    //     let json = data.json;
    //     this.taskList = json;
    // }

    async init() {
    	let RootDir = (await import("../common/gFunc")).RootDir;
        let data = require(RootDir("../app/prop_data/prop_task"));
        this.taskList = data;
    }

    getTaskData(taskid: number): TaskData | null {
        return this.taskList[taskid];
    }

    getTaskDatasByMapId(mapid: number): TaskData[] {
        let tasklist: TaskData[] = [];
        for (const taskid in this.taskList) {
            if (this.taskList.hasOwnProperty(taskid)) {
                const taskdata = this.taskList[taskid];
                if(taskdata.mapid == mapid){
                    tasklist.push(taskdata);
                }
            }
        }
        return tasklist;
    }
}

let taskMgr = new TaskMgr();
export default taskMgr;