import { agentMgr } from "./common/AgentMgr";
import { GateConfig } from "./config";
import * as cluster from "cluster";
import * as os  from "os";

let cpusnum = os.cpus().length;

let gateN = cpusnum > 4 ? 4 : cpusnum;

if(cluster.isMaster){
    for (let i = 0; i < gateN; i++) {
        cluster.fork();
    }
}else{
    agentMgr.start(GateConfig);
}