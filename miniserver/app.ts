import * as cluster from "cluster";
// let cluster = require("cluster");
import * as child_process from "child_process";


cluster.fork()
cluster.isMaster