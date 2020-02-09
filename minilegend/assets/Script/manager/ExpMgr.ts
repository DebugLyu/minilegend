interface ExpDatas {
    level: number,
    needexp: number,
}

class ExpMgr {
    private expList: { [x: number]: ExpDatas } = {};
    async init() {
        let getRes = (await import("../common/gFunc")).getRes;
        let expdata = await getRes("prop_data/prop_roleexp", cc.JsonAsset);
        this.expList = expdata.json;
    }

    // async init(){
    //     let RootDir = (await import("../common/gFunc")).RootDir;
    //     let data = require(RootDir("../app/prop_data/prop_roleexp"));
    //     this.expList = data;
    // }

    getNeedExp(level:number){
        return this.expList[level].needexp;
    }
}
let expMgr = new ExpMgr();
export default expMgr;