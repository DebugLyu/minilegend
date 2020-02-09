import os = require("os");
import fs = require("fs");
import path = require('path'); //系统路径模块
import Llog from "./LLog";

export function RootDir(path: string): string {
	path = "../" + path;
	return path;
}

export function getRes(jsonpath: string) {
	jsonpath = "../" + jsonpath +".json";
	var file = path.join(__dirname, jsonpath);
	return new Promise<any>((resolve, reject) => {
		fs.readFile(file, "utf-8", (err, data: string) => {
			if (err) {
				Llog.error(err);
				resolve({});
				return;
			}
			resolve(JSON.parse(data));
		});
	});
}

export function getLocalIp() {
	const osType = os.type(); //系统类型
	const netInfo = os.networkInterfaces(); //网络信息
	let ip = '';
	if (osType === 'Windows_NT') {
		for (let dev in netInfo) {
			//win7的网络信息中显示为本地连接，win10显示为以太网
			if (dev === '本地连接' || dev === '以太网') {
				for (let j = 0; j < netInfo[dev].length; j++) {
					if (netInfo[dev][j].family === 'IPv4') {
						ip = netInfo[dev][j].address;
						break;
					}
				}
			}
		}
	} else if (osType === 'Linux') {
		ip = netInfo.eth0[0].address;
	}

	return ip;
}


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//   
//							下面前后端通用部分
//
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export function random(min: number = 100, max?: number): number {
	if (max == null) {
		max = min;
		min = 0;
	}
	return Math.floor((Math.random() * (max - min)) + min);
}

let lseed: number = Date.now();
function rnd(): number {
	lseed = (lseed * 9301 + 49297) % 233280; //为何使用这三个数?
	return lseed / (233280.0);
};
export function lRandomSeed(seed: number) {
	lseed = seed;
}
export function lRandom(min: number = 100, max?: number): number {
	if (max == null) {
		max = min;
		min = 0;
	}
	return Math.floor((rnd() * (max - min)) + min);
}

export function safeJson(str: any) {
	if (str == null) {
		return null;
	}
	if (typeof str == "string") {
		if (str[0] != "{" && str[0] != "[") {
			return str;
		}
		try {
			let obj = JSON.parse(str);
			if (obj && typeof obj == "object") {
				return obj;
			}
		} catch (error) {
			console.error('Json parse Error:' + str + '>>> is not Json string');
			console.error(error);
			return str;
		}
	} else if (typeof str == "object") {
		return str;
	}
	console.error('Json parse Error:' + str + '>>> is not Json string');
	return str;
}

export function isJSON(str: string) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			console.error('error：' + str + '!!!' + e);
			return false;
		}
	}
	return false;
}

/**
 * 获取一个随机数组项
 * @param array
 */
export function getRandomArrayItem<T>(array: Array<T>): T {
	return array[Math.trunc(Math.random() * array.length)]
}

/** 随机字符数组,默认去掉了容易混淆的字符oO/9gq/Vv/Uu/LlI1 */
const RANDOM_CHAR = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"

/**
 * 随机字符串
 * @param length
 */
export function getRandomString(length: number): string {
	let result = []
	for (let i = 0; i < length; i += 1) {
		result.push(RANDOM_CHAR[Math.trunc(Math.random() * RANDOM_CHAR.length)])
	}
	return result.join("")
}

/**
 * 采用洗牌算法打乱数组顺序,不更改原数组,返回一个打乱顺序的新数组
 * - 采用遍历+替换的方式。在数量级很大时,可能会有性能损耗
 * @param array
 */
export function shuffleArray<T>(array: Array<T>): Array<T> {
	let result = [...array]
	for (let i = 0; i < result.length; i += 1) {
		let t = Math.trunc(Math.random() * result.length);
		[result[i], result[t]] = [result[t], result[i]];
	}
	return result
}

export function toChineseNum(num: number): string {
	let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
	let unit = ["", "十", "百", "千", "万"];
	let getWan = (temp: number | string) => {
		let strArr = temp.toString().split("").reverse();
		let newNum = "";
		for (var i = 0; i < strArr.length; i++) {
			newNum = (i == 0 && strArr[i] == "0" ? "" : (i > 0 && strArr[i] == "0" && strArr[i - 1] == "0" ? "" : changeNum[Number(strArr[i])] + (strArr[i] == "0" ? unit[0] : unit[i]))) + newNum;
		}
		return newNum;
	}
	let overWan = Math.floor(num / 10000);
	let noWan = num % 10000;
	let noWanStr = "";
	if (noWan.toString().length < 4) {
		noWanStr = "0" + noWan;
	}
	return overWan ? getWan(overWan) + "万" + getWan(noWanStr) : getWan(num);
}