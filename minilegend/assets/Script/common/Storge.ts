class Storge {
	set(key:string, value:string){
		cc.sys.localStorage.setItem(key, value);
	}

	get(key:string): any {
		return cc.sys.localStorage.getItem(key);
	}
}

let storge = new Storge();
export default storge;