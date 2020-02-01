import player from "./player";

class PlayerMgr {
    private playerList = new Map<number, player>();

    addPlayer(p:player){
        this.playerList.set(p.onlyid, p);
    }
}
let playerMgr = new PlayerMgr();
export default playerMgr;