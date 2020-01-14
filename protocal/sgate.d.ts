import * as $protobuf from "protobufjs";
/** Namespace commander. */
export namespace commander {

    /** Namespace sgate. */
    namespace sgate {

        /** Properties of a ReqServer. */
        interface IReqServer {

            /** ReqServer ip */
            ip?: (string|null);

            /** ReqServer port */
            port?: (number|null);

            /** ReqServer kind */
            kind?: (number|null);
        }

        /** Represents a ReqServer. */
        class ReqServer implements IReqServer {

            /**
             * Constructs a new ReqServer.
             * @param [properties] Properties to set
             */
            constructor(properties?: commander.sgate.IReqServer);

            /** ReqServer ip. */
            public ip: string;

            /** ReqServer port. */
            public port: number;

            /** ReqServer kind. */
            public kind: number;

            /**
             * Creates a new ReqServer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReqServer instance
             */
            public static create(properties?: commander.sgate.IReqServer): commander.sgate.ReqServer;

            /**
             * Encodes the specified ReqServer message. Does not implicitly {@link commander.sgate.ReqServer.verify|verify} messages.
             * @param message ReqServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: commander.sgate.IReqServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReqServer message, length delimited. Does not implicitly {@link commander.sgate.ReqServer.verify|verify} messages.
             * @param message ReqServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: commander.sgate.IReqServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReqServer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ReqServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commander.sgate.ReqServer;

            /**
             * Decodes a ReqServer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ReqServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commander.sgate.ReqServer;

            /**
             * Verifies a ReqServer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReqServer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReqServer
             */
            public static fromObject(object: { [k: string]: any }): commander.sgate.ReqServer;

            /**
             * Creates a plain object from a ReqServer message. Also converts values to other types if specified.
             * @param message ReqServer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: commander.sgate.ReqServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReqServer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ResServer. */
        interface IResServer {

            /** ResServer id */
            id?: (number|null);
        }

        /** Represents a ResServer. */
        class ResServer implements IResServer {

            /**
             * Constructs a new ResServer.
             * @param [properties] Properties to set
             */
            constructor(properties?: commander.sgate.IResServer);

            /** ResServer id. */
            public id: number;

            /**
             * Creates a new ResServer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ResServer instance
             */
            public static create(properties?: commander.sgate.IResServer): commander.sgate.ResServer;

            /**
             * Encodes the specified ResServer message. Does not implicitly {@link commander.sgate.ResServer.verify|verify} messages.
             * @param message ResServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: commander.sgate.IResServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResServer message, length delimited. Does not implicitly {@link commander.sgate.ResServer.verify|verify} messages.
             * @param message ResServer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: commander.sgate.IResServer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResServer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commander.sgate.ResServer;

            /**
             * Decodes a ResServer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commander.sgate.ResServer;

            /**
             * Verifies a ResServer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResServer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResServer
             */
            public static fromObject(object: { [k: string]: any }): commander.sgate.ResServer;

            /**
             * Creates a plain object from a ResServer message. Also converts values to other types if specified.
             * @param message ResServer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: commander.sgate.ResServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResServer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
