import Item from "../Item";
import { ItemType } from "../../../common/G";

export default class EquipMat extends Item {

	constructor(){
		super();
		this.type = ItemType.EquipMat;
	}

	
	convType(t: ItemType): EquipMat | null {
		if (this.type == t) {
			return this;
		}
		return null;
	}
}