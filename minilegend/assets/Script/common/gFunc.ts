import { ActState } from "./G";

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
export async function gameAnimation(restype: string, resid: number | string, act?: ActState, dir?: number) {
	let animation_key = `animation/${restype}/${resid}`;
	if(restype == "role" || restype == "weapon"){
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

export async function gameMapSpr(mapid: number, x: number, y: number) {
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

export function random(min: number, max?: number): number {
	if (max == null) {
		max = min;
		min = 0;
	}
	return Math.floor((Math.random() * (max - min)) + min);
}