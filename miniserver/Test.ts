// test.ts

function aa(param: number) {
	let t = 1000;
	return new Promise<number>((resolve, reject) => {
		let a = t + param;
		resolve(a);
	});
}

async function main(){
	let a: number = 0;
	a = await aa(100);
	console.log(a);
}

main();