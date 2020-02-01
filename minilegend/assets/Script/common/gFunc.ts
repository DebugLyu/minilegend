import { ActState } from "./G";
import { ItemData } from "../manager/ItemMgr";

let ActStateStr = {
	[ActState.IDLE]: "idle",
	[ActState.RUN]: "run",
	[ActState.RATK]: "ratk",
	[ActState.ATK]: "atk",
	[ActState.MGC]: "mgc",
	[ActState.DIE]: "die",
}

export function actState2Str(state: ActState) {
	return ActStateStr[state];
}

export function degree2Dir(degree: number): number {
	let dir = 2;
	if (degree >= 337.5 || degree < 22.5) {
		dir = 6;
	} else if (degree >= 22.5 && degree < 67.5) {
		dir = 9;
	} else if (degree >= 67.5 && degree < 112.5) {
		dir = 8;
	} else if (degree >= 112.5 && degree < 157.5) {
		dir = 7;
	} else if (degree >= 157.5 && degree < 202.5) {
		dir = 4;
	} else if (degree >= 202.5 && degree < 247.5) {
		dir = 1;
	} else if (degree >= 247.5 && degree < 292.5) {
		dir = 2;
	} else if (degree >= 292.5 && degree < 337.5) {
		dir = 3;
	}
	return dir;
}
/**
	 * 获取人物资源动作
	 * @param resid 资源id
	 * @param act 动作标识 atk攻击 die死亡 idle等待 mgc施法 ratk攻击等待 run移动
	 * @param dir 方向id 参考小键盘
	 */
// let role_animation_list: cc.AnimationClip[] = [];
export async function getAnimation(restype: string, resid: number | string, act?: ActState, dir?: number) {
	let animation_key = `animation/${restype}/${resid}`;
	if (restype == "role" || restype == "weapon") {
		let actstr = actState2Str(act);
		animation_key += `/${actstr}/${dir}`;
	}
	return new Promise<cc.AnimationClip>((resolve, reject) => {
		cc.loader.loadRes(animation_key, cc.SpriteAtlas, (err, atlas) => {
			if (err) {
				resolve(null);
				return;
			}
			let frames = [];
			for (let i = 0; ; i++) {
				let frame = atlas.getSpriteFrame(i);
				if (frame) frames.push(frame);
				else break;
			}
			let curClip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
			// curClip.name = resid + String(act) + String(dir);
			resolve(curClip);
		});
	});
}

export async function getMapSpr(mapid: number, x: number, y: number) {
	let res_key = `map/jpg/${mapid}/${mapid}_${y}_${x}`;
	return new Promise<cc.SpriteFrame>((resolve, reject) => {
		cc.loader.loadRes(res_key, cc.SpriteFrame, (err, spr) => {
			if (err) {
				cc.log(err);
			} else {
				resolve(spr);
			}
		});
	});
}

export async function getPropData(pname: string) {
	return await new Promise<{ [key: number]: ItemData }>((resolve, reject) => {
		cc.loader.loadRes("/prop_data/" + pname, cc.JsonAsset, (error, jsondata: cc.JsonAsset) => {
			if (error) {
				resolve(null);
				console.error("JSON: " + pname + " Error!");
				return;
			}
			resolve(jsondata.json);
		});
	});
}

/**
     * 载入单个资源
     * @param path
     * @param type
     */
export async function getRes<T extends typeof cc.Asset>(path: string, type: T): Promise<InstanceType<T>> {
	return await new Promise(res => {
		cc.loader.loadRes(path, type, (err, resource) => {
			err && cc.warn(`载入资源失败, path=${path}, err=${err}`)
			err ? res(null) : res(resource)
		})
	})
}

export function getAngle(x1: number, y1: number, x2: number, y2: number): number {
	var degree = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	if (degree < 0) {
		degree = 360 + degree;
	}
	return degree;
}

export function getDir(x1: number, y1: number, x2: number, y2: number): number {
	return degree2Dir(getAngle(x1, y1, x2, y2));
}

export function getNextPos(curpos: cc.Vec2, len: number, angle: number): cc.Vec2 {
	let x1 = curpos.x + len * Math.cos(angle * Math.PI / 180);
	let y1 = curpos.y + len * Math.sin(angle * Math.PI / 180);
	return cc.v2(x1, y1);
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
	if (typeof str == "string") {
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