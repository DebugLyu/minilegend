import { createClient, RedisClient } from "redis";

let rs:RedisClient = createClient({auth_pass:"123456"})

let player1 = {
	onlyid: 100,
	equip: {
		weapon: "100",
		clothes: "200",
	}
}
rs.hmset("players", "player1", JSON.stringify(player1), () => {
    console.log("ok");
})
rs.hmset("players", "player2", JSON.stringify(player1), () => {
    console.log("ok");
})

rs.hmget("players", "player1", (err, strlist) => {
	// console.log("2222", strlist);
	console.log("22222");
	let  t = JSON.parse(strlist[0]);
	console.log(t);
	
});

rs.hgetall("players", (err, strlist) => {

	console.log("3333", strlist);

rs.del("players",  () => {
	console.log("del");
	rs.hgetall("players", (e, str) => {
		console.log(str);
		
	})
});
})






let i = 0;
let args = ["你好", "天啊"]
let message = "nishi[??]shui[??]abc";
while (true) {
	let t = message.indexOf("??");
	if (t == -1) {
		console.log(11);
		break;
	}
	let m = args[i];
	if (m == null) {
		console.log(22, i);
		break;
	}
	message = message.replace(/\?\?/, args[i]);
	i++;
	if(i > 10){
		console.log(33);
		break;
	}
}
console.log(message);
