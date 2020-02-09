/**
 *  事件注册器
 */
let EventSeed = 10000;

class EventListener {
    private eventlist: { [x: string]: { [y: number]: ((...param: any[]) => void) } } = {};

    on(key: string, func: (...args:any[]) => void) {
        EventSeed++
        if (this.eventlist[key] == null) {
            this.eventlist[key] = [];
        }
        this.eventlist[key][EventSeed] = func;
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
                const func = funclist[key];
                if (func == param) {
                    delete funclist[key];
                    break;
                }
            }
        }
    }

    emit(key: string, ...params: any[]) {
        let funclist = this.eventlist[key];
        if (funclist == null) {
            return;
        }

        for (const _ in funclist) {
            let func = funclist[_];
            if (func == null) {
                continue;
            }
            func(params);
        }
    }
}

let LEvent = new EventListener();
export default LEvent;