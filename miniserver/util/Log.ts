import log4js = require("log4js");
let LOG = log4js.getLogger();
LOG.level = "debug";

export default class Llog {
    public static log(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.log(message,args);
    }
    public static error(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.error(message,args);
    }
    public static debug(message: any, ...args: any[]){
        // LOG.debug(message, args);
        console.debug(message,args);
    }
    public static info(message: any, ...args: any[]){
        // LOG.info(message, args);
        console.info(message, ...args);
    }
}