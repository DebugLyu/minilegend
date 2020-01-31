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

export async function getPrefab(pname: string) {
	return new Promise<cc.Prefab>((resolve, reject) => {
		cc.loader.loadRes("/prefab/" + pname, cc.Prefab, (error, prefab) => {
			if (error) {
				resolve(null);
				console.error("Prefab: " + pname + " not found!");
				return;
			}
			resolve(prefab);
		});
	});
}
export async function getPropData(pname: string) {
	return new Promise<{ [key: number]: ItemData }>((resolve, reject) => {
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

export async function getItemAtlas() {
	return new Promise<cc.SpriteAtlas>((resolve, reject) => {
		cc.loader.loadRes("item/ItemIcon", cc.SpriteAtlas, (error, atlas: cc.SpriteAtlas) => {
			if (error) {
				console.error("ItemIcon Error!");
				resolve(null);
				return;
			}
			resolve(atlas);
		});
	});
}

export async function getTexture(path: string) {
	return new Promise<cc.Texture2D>((resolve, reject) => {
		cc.loader.loadRes(path, cc.Texture2D, (error, texture: cc.Texture2D) => {
			if (error) {
				console.error("Texture Path:" + path + " Error!");
				resolve(null);
				return;
			}
			resolve(texture);
		});
	});
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

export function toChineseNum(num: number): string {
	let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
	let unit = ["", "十", "百", "千", "万"];
	let getWan = (temp) => {
		let strArr = temp.toString().split("").reverse();
		let newNum = "";
		for (var i = 0; i < strArr.length; i++) {
			newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
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