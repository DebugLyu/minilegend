import express from "express";
import { ResInterface } from "../common/G";
import playerMgr from "../manager/PlayerMgr";
import http from "./http";
import Llog from "../common/LLog";
import equipMgr from "../manager/EquipMgr";
import { ErrList } from "../common/ErrorList";
import itemMgr from "../manager/ItemMgr";
import Player from "../app/player/Player";
import { md5 } from "../util/crypto";

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

function checkSecret(req: any, player: Player){
    let list = [
        player.uuid,
        player.token,
        player.onlyid,
    ];
    let m = req.query.m;
    let random1 = req.query.r1;
    let random2 = req.query.r2;
    let m1 = md5(String(list[random1]));
    let m2 = md5(String(list[random2]));
    let a1 = m1.slice(0, 19);
    let a2 = m2.slice(11, 32);
    let s = a1+ a2;
    return s == m;
}

async function checkPlayer(req:any, res){
    let uuid = req.query.uuid;
    let player = await playerMgr.getPlayer(uuid);
    if( !checkSecret(req, player)){
        http.reply(res, { ecode: ErrList.Need_ReLogin });
        return null;
    }
    return player;
}

app.get("/login", async (req, res: ResInterface) => {
    let uuid = req.query.uuid;
    let player = await playerMgr.getPlayer(uuid);
    http.reply(res, player);
});

app.get("/createItem", async (req, res: ResInterface) => {
    let player = await checkPlayer(req, res);
    if(player == null){
        return;
    }

    let itemid = req.query.itemid;
    let num = req.query.num;
    let item = itemMgr.genItem(itemid, num);
    if(typeof item == "number"){
        http.reply(res, {ecode: item});
        return;
    }
    player.addItem(item);
    player.update();
    http.reply(res, player.items);
});

app.get("/EquipOn", async (req, res: ResInterface) => {
    let player = await checkPlayer(req, res);
    if (player == null) {
        return;
    }

    let onlyid = req.query.onlyid;
    player.equipOn(onlyid);
    player.update();
    http.reply(res, {items: player.items, equips: player.equips});
});

app.get("/genEquip", (req, res: ResInterface) => {
    let equip = equipMgr.genEquip(30001);
    http.reply(res, equip);
});

app.post("/test", (req) => {
    req.body
});



export function start(port: number) {
    app.listen(port, () => {
        Llog.info('Listen on port ', port);
    });
}