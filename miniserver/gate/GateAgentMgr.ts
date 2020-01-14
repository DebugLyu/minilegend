import WebSocket = require("ws");
import { GateAgent } from "./GateAgent";

let agent_seed_id = 100001;

interface WsConfig {
	port: number,
	name?: string,
	protocal?: [],
}

class GateAgentMgr {
	private agentList = new Map<number, GateAgent>();
	
	constructor() {
		this.agentList.clear();
	}

	start(config: WsConfig) {
		let server = new WebSocket.Server({ port: config.port });
		server.on("connection", (ws: WebSocket) => {
			let agent = new GateAgent(agent_seed_id, ws);
			this.addAgent(agent);
			agent_seed_id++;
		});
	}

	addAgent(agent: GateAgent) {
		this.agentList.set(agent.agentId, agent);
	}

	delAgent(agent: GateAgent | number) {
		if (typeof agent == "number") {
			if (this.agentList.has(agent)) {
				this.agentList.delete(agent);
			}
		}
		if (agent instanceof GateAgent) {
			if (this.agentList.has(agent.agentId)) {
				this.agentList.delete(agent.agentId);
			}
		}
	}

	update(){
		this.agentList.forEach((agent: GateAgent, key:number) => {
			agent.update();
			if(!agent.isopen){
				this.delAgent(agent);
			}
		});
	}
}

export let gateAgentMgr:GateAgentMgr = new GateAgentMgr();