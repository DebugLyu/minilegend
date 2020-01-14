import * as $protobuf from "protobufjs";
/** Namespace protocal. */
export namespace protocal {

    /** Properties of a register. */
    interface Iregister {

        /** register kind */
        kind?: (number|null);
    }

    /** Represents a register. */
    class register implements Iregister {

        /**
         * Constructs a new register.
         * @param [properties] Properties to set
         */
        constructor(properties?: protocal.Iregister);

        /** register kind. */
        public kind: number;

        /**
         * Creates a new register instance using the specified properties.
         * @param [properties] Properties to set
         * @returns register instance
         */
        public static create(properties?: protocal.Iregister): protocal.register;

        /**
         * Encodes the specified register message. Does not implicitly {@link protocal.register.verify|verify} messages.
         * @param message register message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protocal.Iregister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified register message, length delimited. Does not implicitly {@link protocal.register.verify|verify} messages.
         * @param message register message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protocal.Iregister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a register message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protocal.register;

        /**
         * Decodes a register message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocal.register;

        /**
         * Verifies a register message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a register message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns register
         */
        public static fromObject(object: { [k: string]: any }): protocal.register;

        /**
         * Creates a plain object from a register message. Also converts values to other types if specified.
         * @param message register
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protocal.register, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this register to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a resRegister. */
    interface IresRegister {

        /** resRegister agentid */
        agentid?: (number|null);
    }

    /** Represents a resRegister. */
    class resRegister implements IresRegister {

        /**
         * Constructs a new resRegister.
         * @param [properties] Properties to set
         */
        constructor(properties?: protocal.IresRegister);

        /** resRegister agentid. */
        public agentid: number;

        /**
         * Creates a new resRegister instance using the specified properties.
         * @param [properties] Properties to set
         * @returns resRegister instance
         */
        public static create(properties?: protocal.IresRegister): protocal.resRegister;

        /**
         * Encodes the specified resRegister message. Does not implicitly {@link protocal.resRegister.verify|verify} messages.
         * @param message resRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protocal.IresRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified resRegister message, length delimited. Does not implicitly {@link protocal.resRegister.verify|verify} messages.
         * @param message resRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protocal.IresRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a resRegister message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns resRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protocal.resRegister;

        /**
         * Decodes a resRegister message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns resRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protocal.resRegister;

        /**
         * Verifies a resRegister message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a resRegister message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns resRegister
         */
        public static fromObject(object: { [k: string]: any }): protocal.resRegister;

        /**
         * Creates a plain object from a resRegister message. Also converts values to other types if specified.
         * @param message resRegister
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protocal.resRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this resRegister to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
