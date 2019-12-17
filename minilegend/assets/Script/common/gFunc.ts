import { ActState, ActState2Str } from "./G";

/**
	 * 获取人物资源动作
	 * @param resid 资源id
	 * @param act 动作标识 atk攻击 die死亡 idle等待 mgc施法 ratk攻击等待 run移动
	 * @param dir 方向id 参考小键盘
	 */
let role_animation_list: cc.AnimationClip[] = [];
export async function gameAnimation(restype: string, resid: Number, act: ActState, dir: Number) {
	let actstr = ActState2Str(act);
	let animation_key = `animation/${restype}/${resid}/${actstr}/${dir}`;
	return new Promise<cc.AnimationClip>((resolve, reject) => {
		cc.loader.loadRes(animation_key, cc.SpriteAtlas, (err, atlas) => {
			let frames = [];
			for (let i = 0; ; i++) {
				let frame = atlas.getSpriteFrame(i);
				if (frame) frames.push(frame);
				else break;
			}
			let curClip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
			curClip.name = act + String(dir);
			curClip.wrapMode = cc.WrapMode.Loop;
			role_animation_list[animation_key] = curClip;
			resolve(curClip);
		});
	});
}