import gameMgr from "../manager/GameMgr";

class LLog {

    private debugTrace() {
        console.trace();
    }

    public log(message: any, ...args: any[]) {
        if(gameMgr.config.dev){
            console.log(message, ...args);
            // this.debugTrace();
        }
    }

    public error(message: any, ...args: any[]) {
        console.error(message, ...args);
        // this.debugTrace();
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