import * as cluster from "cluster";
// let cluster = require("cluster");
import * as child_process from "child_process";

import express from "express";
import Llog from "./util/Log";
import { ResInterface } from "./util/G";

let app = express();
app.get("/", (req, res:ResInterface) => {

});

app.listen(3000, () => {
    Llog.info('Listen on port 3001');
});

cluster.fork()
cluster.isMaster