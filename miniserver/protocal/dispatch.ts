import { protocal } from "./protocal"
import { Packet } from "./Packet";
import { Agent } from "../common/Agent";
import * as heads from "./ProtocalHead";

function ServerRegister(agent: Agent, pk: Packet) {
	let reg = protocal.register.decode(pk.data as Uint8Array);
	agent.ServerRegister(reg);
}

export const list = {
	[heads.server_register]: ServerRegister,
}