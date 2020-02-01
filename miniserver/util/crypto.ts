import crypto = require('crypto');

export function md5(content: string): string {
	var md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
}

export function toBase64(content: string): string {
	return Buffer.from(content).toString('base64');
}

export function fromBase64 (content: string): string {
	return Buffer.from(content, 'base64').toString();
}
