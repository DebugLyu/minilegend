import * as cluster from "cluster";
// let cluster = require("cluster");
import * as child_process from "child_process";

import express from "express";
import Llog from "./util/Log";
import http from "./util/http";
import { ResInterface } from "./common/G";
import Token from "./util/token";

let app = express();
app.get("/login", (req, res:ResInterface) => {
    // Token.getToken()
    http.reply(res, {dfa:"f"});
});

app.post("/test", (req, res, next) => {
    req.body
});

app.listen(3000, () => {
    Llog.info('Listen on port 3001');
});