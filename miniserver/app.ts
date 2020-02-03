
import express from "express";
import Llog from "./util/Log";
import http from "./util/http";
import { ResInterface } from "./common/G";
import playerMgr from "./player/PlayerMgr";
import { GameConfig } from "./config";

let app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});


 app.get("/login", async (req, res: ResInterface) => {
    let uuid = req.query.uuid;

    let player = await playerMgr.getPlayer(uuid);

    http.reply(res, player );
});

app.post("/test", (req) => {
    req.body
});

app.listen(GameConfig.port, () => {
    Llog.info('Listen on port ', GameConfig.port);
});


/*
let tt = 100;
class btest {
    [x:string] : any;
    [100] : number = 100;
    [200] : number = 200;
    fromJson(json:any){
        for (const key in json) {
            this[key] = json[key];
        }
    }
}
class test {
    [x:string]: any;
    a:string = "test";
    c: btest = new btest();
    d: btest[] = [];
    b() {
        console.log(this.a);
    }
    constructor(){
        this.d.push(new btest());
        this.d.push(new btest());
    }
}
let c = new test();
c.d[0][100] = 1000;
let t = JSON.stringify(c);
console.log(t);

let o = JSON.parse(t);
let b = new test();
for (const key in o) {
    b[key] = o[key];
}
console.log(b,b.c, b.d[0][100]);
// b.d.
*/