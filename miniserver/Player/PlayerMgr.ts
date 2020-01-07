
export default class PlayerMgr {
    
    private static _instance: PlayerMgr;
    public static get instance() : PlayerMgr {
        if(this._instance == null){
            this._instance = new PlayerMgr(); 
        }
        return this._instance;
    }

    addPlayer(p:any){

    }
}