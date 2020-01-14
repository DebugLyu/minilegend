import { commander } from "./sgate"
import { GateAgent } from "../gate/GateAgent";

function ReqServer(agent: GateAgent, data: Uint8Array){
	let reqserver = commander.sgate.ReqServer.decode(data);
	agent.ReqServer(reqserver);
}


export const SgateDispatch = {
	[1000] : ReqServer,
}