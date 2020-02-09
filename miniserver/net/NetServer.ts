import express from "express";
import { ResInterface } from "../common/G";
import playerMgr from "../manager/PlayerMgr";
import http from "./http";
import Llog from "../common/LLog";
import equipMgr from "../manager/EquipMgr";

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
    http.reply(res, player);
});

app.get("/genEquip", (req, res: ResInterface) => {
    let equip = equipMgr.genEquip(30001);
    http.reply(res, equip);
});

app.post("/test", (req) => {
    req.body
});



export function start(port: number){
    app.listen(port, () => {
        Llog.info('Listen on port ', port);
    });
}