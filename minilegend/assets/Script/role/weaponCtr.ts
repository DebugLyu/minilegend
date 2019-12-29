const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/WarriorCtr")
export default class WeaponCtr extends cc.Component {
	
	private _resId : number = 0;
	public get resId() : number {
		return this._resId;
	}
	public set resId(v : number) {
		this._resId = v;
		this.node.active = this._resId != 0;
	}
}
