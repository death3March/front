/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 5.29.0
 * source: src/features/api/data.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";

export class Data extends pb_1.Message {
	#one_of_decls: number[][] = [[1, 2, 3, 4, 5]];
	constructor(
		data?:
			| never[]
			| ({
					userID?: string;
			  } & (
					| {
							roomName?: string;
							point?: never;
							DisplayName?: never;
							message?: never;
							newUserID?: never;
					  }
					| {
							roomName?: never;
							point?: Point;
							DisplayName?: never;
							message?: never;
							newUserID?: never;
					  }
					| {
							roomName?: never;
							point?: never;
							DisplayName?: string;
							message?: never;
							newUserID?: never;
					  }
					| {
							roomName?: never;
							point?: never;
							DisplayName?: never;
							message?: string;
							newUserID?: never;
					  }
					| {
							roomName?: never;
							point?: never;
							DisplayName?: never;
							message?: never;
							newUserID?: string;
					  }
			  )),
	) {
		super();
		pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
		if (!Array.isArray(data) && typeof data == "object") {
			if ("roomName" in data && data.roomName != undefined) {
				this.roomName = data.roomName;
			}
			if ("point" in data && data.point != undefined) {
				this.point = data.point;
			}
			if ("DisplayName" in data && data.DisplayName != undefined) {
				this.DisplayName = data.DisplayName;
			}
			if ("message" in data && data.message != undefined) {
				this.message = data.message;
			}
			if ("newUserID" in data && data.newUserID != undefined) {
				this.newUserID = data.newUserID;
			}
			if ("userID" in data && data.userID != undefined) {
				this.userID = data.userID;
			}
		}
	}
	get roomName() {
		return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
	}
	set roomName(value: string) {
		pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
	}
	get has_roomName() {
		return pb_1.Message.getField(this, 1) != null;
	}
	get point() {
		return pb_1.Message.getWrapperField(this, Point, 2) as Point;
	}
	set point(value: Point) {
		pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[0], value);
	}
	get has_point() {
		return pb_1.Message.getField(this, 2) != null;
	}
	get DisplayName() {
		return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
	}
	set DisplayName(value: string) {
		pb_1.Message.setOneofField(this, 3, this.#one_of_decls[0], value);
	}
	get has_DisplayName() {
		return pb_1.Message.getField(this, 3) != null;
	}
	get message() {
		return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
	}
	set message(value: string) {
		pb_1.Message.setOneofField(this, 4, this.#one_of_decls[0], value);
	}
	get has_message() {
		return pb_1.Message.getField(this, 4) != null;
	}
	get newUserID() {
		return pb_1.Message.getFieldWithDefault(this, 5, "") as string;
	}
	set newUserID(value: string) {
		pb_1.Message.setOneofField(this, 5, this.#one_of_decls[0], value);
	}
	get has_newUserID() {
		return pb_1.Message.getField(this, 5) != null;
	}
	get userID() {
		return pb_1.Message.getFieldWithDefault(this, 6, "") as string;
	}
	set userID(value: string) {
		pb_1.Message.setField(this, 6, value);
	}
	get type() {
		const cases: {
			[index: number]: "none" | "roomName" | "point" | "DisplayName" | "message" | "newUserID";
		} = {
			0: "none",
			1: "roomName",
			2: "point",
			3: "DisplayName",
			4: "message",
			5: "newUserID",
		};
		return cases[pb_1.Message.computeOneofCase(this, [1, 2, 3, 4, 5])];
	}
	static fromObject(data: {
		roomName?: string;
		point?: ReturnType<typeof Point.prototype.toObject>;
		DisplayName?: string;
		message?: string;
		newUserID?: string;
		userID?: string;
	}): Data {
		const message = new Data({});
		if (data.roomName != null) {
			message.roomName = data.roomName;
		}
		if (data.point != null) {
			message.point = Point.fromObject(data.point);
		}
		if (data.DisplayName != null) {
			message.DisplayName = data.DisplayName;
		}
		if (data.message != null) {
			message.message = data.message;
		}
		if (data.newUserID != null) {
			message.newUserID = data.newUserID;
		}
		if (data.userID != null) {
			message.userID = data.userID;
		}
		return message;
	}
	toObject() {
		const data: {
			roomName?: string;
			point?: ReturnType<typeof Point.prototype.toObject>;
			DisplayName?: string;
			message?: string;
			newUserID?: string;
			userID?: string;
		} = {};
		if (this.roomName != null) {
			data.roomName = this.roomName;
		}
		if (this.point != null) {
			data.point = this.point.toObject();
		}
		if (this.DisplayName != null) {
			data.DisplayName = this.DisplayName;
		}
		if (this.message != null) {
			data.message = this.message;
		}
		if (this.newUserID != null) {
			data.newUserID = this.newUserID;
		}
		if (this.userID != null) {
			data.userID = this.userID;
		}
		return data;
	}
	serialize(): Uint8Array;
	serialize(w: pb_1.BinaryWriter): void;
	serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
		const writer = w || new pb_1.BinaryWriter();
		if (this.has_roomName) writer.writeString(1, this.roomName);
		if (this.has_point) writer.writeMessage(2, this.point, () => this.point.serialize(writer));
		if (this.has_DisplayName) writer.writeString(3, this.DisplayName);
		if (this.has_message) writer.writeString(4, this.message);
		if (this.has_newUserID) writer.writeString(5, this.newUserID);
		if (this.userID.length) writer.writeString(6, this.userID);
		if (!w) return writer.getResultBuffer();
	}
	static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Data {
		const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
			message = new Data();
		while (reader.nextField()) {
			if (reader.isEndGroup()) break;
			switch (reader.getFieldNumber()) {
				case 1:
					message.roomName = reader.readString();
					break;
				case 2:
					reader.readMessage(message.point, () => (message.point = Point.deserialize(reader)));
					break;
				case 3:
					message.DisplayName = reader.readString();
					break;
				case 4:
					message.message = reader.readString();
					break;
				case 5:
					message.newUserID = reader.readString();
					break;
				case 6:
					message.userID = reader.readString();
					break;
				default:
					reader.skipField();
			}
		}
		return message;
	}
	serializeBinary(): Uint8Array {
		return this.serialize();
	}
	static deserializeBinary(bytes: Uint8Array): Data {
		return Data.deserialize(bytes);
	}
}
export class Point extends pb_1.Message {
	#one_of_decls: number[][] = [];
	constructor(
		data?:
			| never[]
			| {
					x?: number;
					y?: number;
			  },
	) {
		super();
		pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
		if (!Array.isArray(data) && typeof data == "object") {
			if ("x" in data && data.x != undefined) {
				this.x = data.x;
			}
			if ("y" in data && data.y != undefined) {
				this.y = data.y;
			}
		}
	}
	get x() {
		return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
	}
	set x(value: number) {
		pb_1.Message.setField(this, 1, value);
	}
	get y() {
		return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
	}
	set y(value: number) {
		pb_1.Message.setField(this, 2, value);
	}
	static fromObject(data: {
		x?: number;
		y?: number;
	}): Point {
		const message = new Point({});
		if (data.x != null) {
			message.x = data.x;
		}
		if (data.y != null) {
			message.y = data.y;
		}
		return message;
	}
	toObject() {
		const data: {
			x?: number;
			y?: number;
		} = {};
		if (this.x != null) {
			data.x = this.x;
		}
		if (this.y != null) {
			data.y = this.y;
		}
		return data;
	}
	serialize(): Uint8Array;
	serialize(w: pb_1.BinaryWriter): void;
	serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
		const writer = w || new pb_1.BinaryWriter();
		if (this.x != 0) writer.writeFloat(1, this.x);
		if (this.y != 0) writer.writeFloat(2, this.y);
		if (!w) return writer.getResultBuffer();
	}
	static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Point {
		const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
			message = new Point();
		while (reader.nextField()) {
			if (reader.isEndGroup()) break;
			switch (reader.getFieldNumber()) {
				case 1:
					message.x = reader.readFloat();
					break;
				case 2:
					message.y = reader.readFloat();
					break;
				default:
					reader.skipField();
			}
		}
		return message;
	}
	serializeBinary(): Uint8Array {
		return this.serialize();
	}
	static deserializeBinary(bytes: Uint8Array): Point {
		return Point.deserialize(bytes);
	}
}