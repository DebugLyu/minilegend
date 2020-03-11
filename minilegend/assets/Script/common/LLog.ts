import gameMgr from "../manager/GameMgr";
import { ErrList } from "./ErrorList";

let __trace__ = false;
class LLog {
    private debugTrace() {
        console.trace();
    }

    public log(message: any, ...args: any[]) {
        let msg = message;
        if(typeof message == "number"){
            msg = ErrList.Cannot_Enter_Stage
        }
        if(gameMgr.config.dev){
            console.log(msg, ...args);
            if(__trace__){
                this.debugTrace();
            }
        }
    }

    public error(message: any, ...args: any[]) {
        console.error(message, ...args);
        if(__trace__){
            this.debugTrace();
        }
    }

    public debug(message: any, ...args: any[]) {
        if (gameMgr.config.dev) {
            console.debug(message, ...args);
        }
    }

    public info(message: any, ...args: any[]) {
        if (gameMgr.config.dev) {
            console.info(message, ...args);
        }
    }
}

let Llog = new LLog();
export default Llog;