/**
	 * 获取人物资源动作
	 * @param resid 资源id
	 * @param act 动作标识 atk攻击 die死亡 idle等待 mgc施法 ratk攻击等待 run移动
	 * @param dir 方向id 参考小键盘
	 */
export async function roleAnimation(resid: Number, act: String, dir: Number) {
	return new Promise<cc.AnimationClip>((resolve, reject) => {
		cc.loader.loadRes("role/" + resid + "/" + act + "/" + dir, cc.SpriteAtlas, (err, atlas) => {
			let frames = [];
			for (let i = 0; ; i++) {
				let frame = atlas.getSpriteFrame(i);
				if (frame) frames.push(frame);
				else break;
			}
			let curClip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
			curClip.name = act + String(dir);
			curClip.wrapMode = cc.WrapMode.Loop;
			resolve(curClip);
		});
	});
}