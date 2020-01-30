export enum AgentKind {
    Server = 1,
    Client = 9,
}

export interface ResInterface {
    send: (arg0: any) => void,
}