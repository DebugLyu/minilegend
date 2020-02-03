const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/common/nodeLayout")
export default class nodeLayout extends cc.Component {
	@property
	_isHorizontal: boolean = true;// Vertical

	@property
	get horizontal(): boolean {
		return this._isHorizontal;
	}
	set horizontal(b: boolean) {
		this._isHorizontal = b;
		this.setLayout();
	}

	onEnable() {
		this.scheduleOnce(() => {
			this.setLayout();
		});
	}

	setLayout() {
		let nodelist = this.node.children;

		nodelist.sort((a, b) => {
			if (this._isHorizontal) {
				return (a.x + 10000) - (b.x + 10000);
			}
			return (a.y + 10000) - (b.y + 10000);
		});

		if (this._isHorizontal) {
			let width = this.node.width;
			let w2 = this.node.getContentSize().width
			let nw = width / nodelist.length;
			for (let i = 0; i < nodelist.length; i++) {
				const node = nodelist[i];
				node.y = 0;
				node.x = (i * nw + (nw / 2)) - (width / 2);

				node.scale = cc.winSize.width / 640;
			}
		} else {
			let height = this.node.height;
			let nh = height / nodelist.length;
			for (let i = 0; i < nodelist.length; i++) {
				const node = nodelist[i];
				node.y = (i * nh + (nh / 2)) - (height / 2);
				node.x = 0;
			}
		}

	}
}
