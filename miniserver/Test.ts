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

