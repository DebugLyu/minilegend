import os = require("os");

export function getLocalIp() {
	const osType = os.type(); //系统类型
	const netInfo = os.networkInterfaces(); //网络信息
	let ip = '';
	if (osType === 'Windows_NT') {
		for (let dev in netInfo) {
			//win7的网络信息中显示为本地连接，win10显示为以太网
			if (dev === '本地连接' || dev === '以太网') {
				for (let j = 0; j < netInfo[dev].length; j++) {
					if (netInfo[dev][j].family === 'IPv4') {
						ip = netInfo[dev][j].address;
						break;
					}
				}
			}
		}
	} else if (osType === 'Linux') {
		ip = netInfo.eth0[0].address;
	}

	return ip;
}

export function safeJson(str: any) {
	if (typeof str == "string") {
		try {
			let obj = JSON.parse(str);
			if (obj && typeof obj == "object") {
				return obj;
			}
		} catch (error) {
			console.error('Json parse Error:' + str + '>>> is not Json string');
			console.error(error);
			return str;
		}
	} else if (typeof str == "object") {
		return str;
	}
	console.error('Json parse Error:' + str + '>>> is not Json string');
	return str;
}

export function isJSON(str: string) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			console.log('error：' + str + '!!!' + e);
			return false;
		}
	}
	return false;
}