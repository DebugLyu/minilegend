
export enum LivingType {
	NOTHING = 0,
	OBJECT,
	NPC,
	MONSTER,
	PLAYER,
}

export function degree2Dir(degree: number): number {
	let dir = 2;
	if (degree >= -22.5 && degree < 22.5) {
		dir = 6;
	} else if (degree >= 22.5 && degree < 67.5) {
		dir = 3;
	} else if (degree >= 67.5 && degree < 112.5) {
		dir = 2;
	} else if (degree >= 112.5 && degree < 157.5) {
		dir = 1;
	} else if (degree >= 157.5 && degree <= 180 || degree > -180 && degree < -157.5) {
		dir = 4;
	} else if (degree > -157.5 && degree < -112.5) {
		dir = 7;
	} else if (degree > -112.5 && degree < -67.5) {
		dir = 8;
	} else if (degree > -67.5 && degree < -22.5) {
		dir = 9;
	}
	return dir;
}