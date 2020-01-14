
function int16ToByte(num: number): Uint8Array {
	//只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
	let bytes: Uint8Array = new Uint8Array(2);
	bytes[0] = num >> 8 & 0xff
	bytes[1] = num & 0xff

	return bytes;
}

function int32ToByte(num: number): Uint8Array {
	let bytes: Uint8Array = new Uint8Array(4);
	bytes[0] = num >> 24 & 0xff;
	bytes[1] = num >> 16 & 0xff;
	bytes[2] = num >> 8 & 0xff;
	bytes[3] = num & 0xff;
	return bytes;
}

function int64ToByte(num: number): Uint8Array {
	//只有int类型，小于256点1字节，大于256点两字节，所有只能返过来
	let bytes: Uint8Array = new Uint8Array(8);
	//没有64位只能前4位补0
	bytes[0] = 0;
	bytes[1] = 0;
	bytes[2] = 0;
	bytes[3] = 0;

	bytes[4] = num >> 24 & 0xff;
	bytes[5] = num >> 16 & 0xff;
	bytes[6] = num >> 8 & 0xff;
	bytes[7] = num & 0xff;
	return bytes;
}
function bytes2int16(arr: Uint8Array): number {
	return ((arr[0] & 0xFF) << 8) | (arr[1] & 0xFF);
}

function bytes2int64(arr: Uint8Array): number {
	//没有64位只能取后四位
	return ((arr[4] & 0xFF) << 24) | ((arr[5] & 0xFF) << 16) | ((arr[6] & 0xFF) << 8) | (arr[7] & 0xFF);
}

function bytes2int32(arr: Uint8Array): number {
	//没有64位只能取后四位
	return ((arr[0] & 0xFF) << 24) | ((arr[1] & 0xFF) << 16) | ((arr[2] & 0xFF) << 8) | (arr[3] & 0xFF);
}

export class Packet {
	head: number = 0;
	data: Uint8Array | null = null;
	constructor(head: number, data: Uint8Array | null) {
		this.head = head;
		this.data = data;
	}

	encode(): Uint8Array {
		let len = this.data?.length || 0;
		let all_len = 4 + len;
		let arrayBuffer = new ArrayBuffer(all_len);
		let buffer = new Uint8Array(arrayBuffer);
		let all_len_bytes = int32ToByte(all_len);
		for (let i = 0; i < all_len_bytes.length; i++) {
			buffer[i] = all_len_bytes[i];
		}
		let head_bytes = int32ToByte(this.head);
		for (let i = 0; i < head_bytes.length; i++) {
			buffer[4 + i] = head_bytes[i];
		}
		if (this.data != null) {
			for (let i: number = 0; i < this.data.length; i++) {
				buffer[i + 8] = this.data[i];
			}
		}
		return buffer;
	}

	static decode(buffer: ArrayBuffer): Packet {
		let bytebuffer = new Uint8Array(buffer);
		let head = bytes2int32(bytebuffer.slice(0, 4));
		let pk: Packet = new Packet(head, bytebuffer.slice(12));
		return pk;
	}
}
