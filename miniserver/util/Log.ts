import log4js = require("log4js");
let LOG = log4js.getLogger();
LOG.level = "debug";

class Llog {
    public log(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.log(message,args);
    }
    public error(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.error(message,args);
    }
    public debug(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.debug(message,args);
    }
    public info(message: any, ...args: any[]){
        // LOG.info(message, args);
        console.info(message, ...args);
    }
}

let llog = new Llog();
export default llog;