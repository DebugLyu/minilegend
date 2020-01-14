import { commander } from "./sgate"
import { GateAgent } from "../gate/GateAgent";

function ResServer(agent: GateAgent, data: Uint8Array){
	let resserver = commander.sgate.ResServer.decode(data);
	agent.ResServer(resserver);
}


export const SgateDispatch = {
	[1000] : ResServer,
}