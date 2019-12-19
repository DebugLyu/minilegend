
let b: {[key:number]: string } = {}
b[1] = "123";
b[2] = "2"
b[3] = "3"

delete b[2];

console.log(b);

// let gg: Array<number>[] = [];
// gg[10] = []
// gg[10][8] = 123;

// console.log(gg[5][2]);

// for (let i = 0; i < gg.length; i++) {
// 	const list = gg[i];
// 	for (let t = 0; t < list.length; t++) {
// 		const b = list[t];
// 		console.log(b);
		
// 	}
// }