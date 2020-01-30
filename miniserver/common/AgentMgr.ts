import WebSocket = require("ws");
import { Agent } from "./Agent";
import Llog from "../util/Log";

let agent_seed_id = 100001;

interface WsConfig {
    port: number,
    name?: string,
    protocal?: [],
}

class AgentMgr {
    private agentList = new Map<number, Agent>();
    
    constructor() {
        this.agentList.clear();
    }

    start(config: WsConfig) {
        let server = new WebSocket.Server({ port: config.port });
        server.on("connection", (ws: WebSocket) => {
            let agent = new Agent(agent_seed_id, ws);
            this.addAgent(agent);
            agent_seed_id++;
        });
        Llog.info("Gate 进程启动，开始监听 " + config.port);
    }

    addAgent(agent: Agent) {
        this.agentList.set(agent.agentId, agent);
    }

    delAgent(agent: Agent | number) {
        if (typeof agent == "number") {
            if (this.agentList.has(agent)) {
                this.agentList.delete(agent);
            }
        }
        if (agent instanceof Agent) {
            if (this.agentList.has(agent.agentId)) {
                this.agentList.delete(agent.agentId);
            }
        }
    }

    update(){
        this.agentList.forEach((agent: Agent) => {
            agent.update();
            if(!agent.isopen){
                this.delAgent(agent);
            }
        });
    }
}

export let agentMgr:AgentMgr = new AgentMgr();