
import WebSocket = require("ws");
import { Packet } from "../protocal/Packet";
import { protocal } from "../protocal/protocal";
import { AgentKind } from "./G";

export class Agent {
	// 添加自定义内容
	[x: string]: any;

	agentId: number = 0;
	ws: WebSocket | null = null;
	handles: { [key: number]: (agent: Agent, pk: Packet) => void } = {};

	pingtime: number = 0;
	isopen: boolean = false;

	kind: number = 0;
	ip: string = "";
	port: number = 0;


	constructor(id: number = 0, ws: WebSocket) {
		this.agentId = id;
		this.ws = ws;
		this.init()
	}

	init() {
		this.ws?.on("open", () => {
			console.log("this.ws? on open");
			this.isopen = true;
		});

		this.ws?.on("close", (code: number, reason: string) => {
			console.log(code);
			console.log(reason);
			this.isopen = false;
		});

		this.ws?.on("error", (error: Error) => {
			console.log(error);
		});

		this.ws?.on("ping", (data: Buffer) => {
			this.pingtime = 0;
		});

		this.ws?.on("pong", (data: Buffer) => {

		});
		this.ws?.on("message", (data: WebSocket.Data) => {
			if (data instanceof ArrayBuffer) {
				let pk: Packet = Packet.decode(data);
				if (pk) {
					if (pk.head == 1000) {
						let reg = protocal.register.decode(pk.data as Uint8Array);
						if (reg.kind == AgentKind.Server) {
							this.regServer();
						} else {
							this.regClient();
						}
					}
				}
			}
		});
	}

	regServer() {

	}

	regClient() {

	}

	regHandles(handles: {}) {

	}

	update() {
		this.pingtime++;
		if (this.pingtime > 30) {
			this.close();
		}
	}

	close() {
		this.isopen = false;
		this.ws?.close();
	}


	ServerRegister(reg: protocal.register) {

	}
}
