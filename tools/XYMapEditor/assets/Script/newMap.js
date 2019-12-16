cc.Class({
	extends: cc.Component,
	properties: {
		allMap:cc.Node,
		labpre: cc.Node,
		labBg: cc.Node,

		toLabel: cc.Label,
	},

	ctor(){
		this._loaded = false;
	},

	onEnable(){

		// 加载所有地图资源
		cc.loader.loadResDir('mapres', cc.SpriteFrame,  (err, assets) => {
			let sprites = {}
			for (const spriteframe of assets) {
				sprites[spriteframe.name] = spriteframe;
			}
			this.mapAssets = sprites;
			this.init();
			this._loaded = true;
		});
	},

	init(){
		for (const key in this.mapAssets) {
			if (this.mapAssets.hasOwnProperty(key)) {
				const spr = this.mapAssets[key];
				let newnode = cc.instantiate(this.labpre);
				newnode.parent = this.labBg;
				let label = newnode.getComponent(cc.Label);
				label.string = key;
			}
		}
	},

	onClick(e, d){
		let node = e.target;
		let label = node.getComponent(cc.Label);
		this.toLabel.string = label.string;
		this.allMap.active = false;
	},

	showAllMapAssets(){
		this.allMap.active = true;
	},

})