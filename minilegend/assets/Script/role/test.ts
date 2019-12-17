import player from "./PlayerMod";

let t = new player();

let b: {[key:number]: string } = {}
b[1] = "123";
b[2] = "2"
b[3] = "3"

delete b[2];

console.log(b);
