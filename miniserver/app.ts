import * as cluster from "cluster";
// let cluster = require("cluster");
import * as child_process from "child_process";

import express from "express";
import Llog from "./util/Log";
import http from "./util/http";
import { ResInterface } from "./common/G";
import Token from "./util/token";
import player from "./Player/player";
import playerMgr from "./Player/PlayerMgr";
import { RedisClient, createClient } from "redis";

let app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 通过连接 获取客户端ip
function getClientIP(req: any) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    ip = ip.replace(/::ffff:/, '');
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
}

app.get("/login", (req, res: ResInterface) => {
    // req.ip
    let ip = getClientIP(req);
    let uuid = req.query.uuid;

    let token = Token.getToken(uuid);
    let p = new player();
    p.uuid = uuid;
    p.token = token;
    // playerMgr.addPlayer(p);
    // redis.set(uuid, p.toString());
    // let redis = new RedisClient({});
    

    http.reply(res, { dfa: "f" });
});

app.post("/test", (req, res, next) => {
    req.body
});

app.listen(3000, () => {
    Llog.info('Listen on port 3001');
});