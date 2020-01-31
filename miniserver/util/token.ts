import { lRandomSeed, lRandom } from "../common/gFunc";

export default class Token {
	public static getToken(str: string): string{
		let t = lRandom(10000000);
		let token = t + str;
		return token;
	}
}