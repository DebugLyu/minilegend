/**
 *  事件注册器
 */
let EventSeed = 10000;

class EventListener {
    private eventlist: { [x: string]: { [y: number]: { f: ((...param: any[]) => void), t: any} } } = {};

    on(key: string, func: (...args: any[]) => void, target?: any) {
        EventSeed++
        if (this.eventlist[key] == null) {
            this.eventlist[key] = [];
        }
        this.eventlist[key][EventSeed] = { 
            f: func, 
            t : target
        };
        return EventSeed;
    }

    off(key: string, func: (...p: any[]) => void): void;
    off(key: string, id: number): void;
    off(key: string, param: ((...p: any[]) => void) | number): void {
        let funclist = this.eventlist[key];
        if (funclist == null) {
            return;
        }

        if (typeof param == "number") {
            delete funclist[param];
        } else {
            for (const key in funclist) {
                const fobj = funclist[key];
                if (fobj.f == param) {
                    delete funclist[key];
                    break;
                }
            }
        }
    }

    emit(key: string, ...params:any[]) {
        let funclist = this.eventlist[key];
        if (funclist == null) {
            return;
        }

        for (const _ in funclist) {
            let fobj = funclist[_];
            if (fobj == null) {
                continue;
            }
            let f = fobj.f;
            let t = fobj.t;
            if(t != null){
                f.call(t, ...params);
            }else{
                f(...params);
            }
        }
    }
}

let LEvent = new EventListener();
export default LEvent;