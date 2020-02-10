import gameMgr from "./manager/GameMgr";
import { start as NetServer } from "./net/NetServer";

gameMgr.init();
gameMgr.regGameStart(() => {
    NetServer(gameMgr.config.port);
});


/*
let tt = 100;
class btest {
    [x:string] : any;
    [100] : number = 100;
    [200] : number = 200;
    fromJson(json:any){
        for (const key in json) {
            this[key] = json[key];
        }
    }
}
class test {
    [x:string]: any;
    a:string = "test";
    c: btest = new btest();
    d: btest[] = [];
    b() {
        console.log(this.a);
    }
    constructor(){
        this.d.push(new btest());
        this.d.push(new btest());
    }
}
let c = new test();
c.d[0][100] = 1000;
let t = JSON.stringify(c);
console.log(t);

let o = JSON.parse(t);
let b = new test();
for (const key in o) {
    b[key] = o[key];
}
console.log(b,b.c, b.d[0][100]);
// b.d.
*/