import { getRandomString } from "../common/gFunc";
import { md5 } from "./crypto";

export default class Token {
	public static getToken(str: string): string{
		let t = getRandomString(10);
		let token = t + str;
		token = md5(token);
		return token;
	}
}