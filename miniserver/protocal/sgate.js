/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.commander = (function() {

    /**
     * Namespace commander.
     * @exports commander
     * @namespace
     */
    var commander = {};

    commander.sgate = (function() {

        /**
         * Namespace sgate.
         * @memberof commander
         * @namespace
         */
        var sgate = {};

        sgate.ReqServer = (function() {

            /**
             * Properties of a ReqServer.
             * @memberof commander.sgate
             * @interface IReqServer
             * @property {string|null} [ip] ReqServer ip
             * @property {number|null} [port] ReqServer port
             * @property {number|null} [kind] ReqServer kind
             */

            /**
             * Constructs a new ReqServer.
             * @memberof commander.sgate
             * @classdesc Represents a ReqServer.
             * @implements IReqServer
             * @constructor
             * @param {commander.sgate.IReqServer=} [properties] Properties to set
             */
            function ReqServer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ReqServer ip.
             * @member {string} ip
             * @memberof commander.sgate.ReqServer
             * @instance
             */
            ReqServer.prototype.ip = "";

            /**
             * ReqServer port.
             * @member {number} port
             * @memberof commander.sgate.ReqServer
             * @instance
             */
            ReqServer.prototype.port = 0;

            /**
             * ReqServer kind.
             * @member {number} kind
             * @memberof commander.sgate.ReqServer
             * @instance
             */
            ReqServer.prototype.kind = 0;

            /**
             * Creates a new ReqServer instance using the specified properties.
             * @function create
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {commander.sgate.IReqServer=} [properties] Properties to set
             * @returns {commander.sgate.ReqServer} ReqServer instance
             */
            ReqServer.create = function create(properties) {
                return new ReqServer(properties);
            };

            /**
             * Encodes the specified ReqServer message. Does not implicitly {@link commander.sgate.ReqServer.verify|verify} messages.
             * @function encode
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {commander.sgate.IReqServer} message ReqServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqServer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ip != null && message.hasOwnProperty("ip"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.ip);
                if (message.port != null && message.hasOwnProperty("port"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.port);
                if (message.kind != null && message.hasOwnProperty("kind"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.kind);
                return writer;
            };

            /**
             * Encodes the specified ReqServer message, length delimited. Does not implicitly {@link commander.sgate.ReqServer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {commander.sgate.IReqServer} message ReqServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqServer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReqServer message from the specified reader or buffer.
             * @function decode
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {commander.sgate.ReqServer} ReqServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqServer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.commander.sgate.ReqServer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ip = reader.string();
                        break;
                    case 2:
                        message.port = reader.int32();
                        break;
                    case 3:
                        message.kind = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ReqServer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {commander.sgate.ReqServer} ReqServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqServer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReqServer message.
             * @function verify
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqServer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ip != null && message.hasOwnProperty("ip"))
                    if (!$util.isString(message.ip))
                        return "ip: string expected";
                if (message.port != null && message.hasOwnProperty("port"))
                    if (!$util.isInteger(message.port))
                        return "port: integer expected";
                if (message.kind != null && message.hasOwnProperty("kind"))
                    if (!$util.isInteger(message.kind))
                        return "kind: integer expected";
                return null;
            };

            /**
             * Creates a ReqServer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {commander.sgate.ReqServer} ReqServer
             */
            ReqServer.fromObject = function fromObject(object) {
                if (object instanceof $root.commander.sgate.ReqServer)
                    return object;
                var message = new $root.commander.sgate.ReqServer();
                if (object.ip != null)
                    message.ip = String(object.ip);
                if (object.port != null)
                    message.port = object.port | 0;
                if (object.kind != null)
                    message.kind = object.kind | 0;
                return message;
            };

            /**
             * Creates a plain object from a ReqServer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof commander.sgate.ReqServer
             * @static
             * @param {commander.sgate.ReqServer} message ReqServer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqServer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.ip = "";
                    object.port = 0;
                    object.kind = 0;
                }
                if (message.ip != null && message.hasOwnProperty("ip"))
                    object.ip = message.ip;
                if (message.port != null && message.hasOwnProperty("port"))
                    object.port = message.port;
                if (message.kind != null && message.hasOwnProperty("kind"))
                    object.kind = message.kind;
                return object;
            };

            /**
             * Converts this ReqServer to JSON.
             * @function toJSON
             * @memberof commander.sgate.ReqServer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqServer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ReqServer;
        })();

        sgate.ResServer = (function() {

            /**
             * Properties of a ResServer.
             * @memberof commander.sgate
             * @interface IResServer
             * @property {number|null} [id] ResServer id
             */

            /**
             * Constructs a new ResServer.
             * @memberof commander.sgate
             * @classdesc Represents a ResServer.
             * @implements IResServer
             * @constructor
             * @param {commander.sgate.IResServer=} [properties] Properties to set
             */
            function ResServer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ResServer id.
             * @member {number} id
             * @memberof commander.sgate.ResServer
             * @instance
             */
            ResServer.prototype.id = 0;

            /**
             * Creates a new ResServer instance using the specified properties.
             * @function create
             * @memberof commander.sgate.ResServer
             * @static
             * @param {commander.sgate.IResServer=} [properties] Properties to set
             * @returns {commander.sgate.ResServer} ResServer instance
             */
            ResServer.create = function create(properties) {
                return new ResServer(properties);
            };

            /**
             * Encodes the specified ResServer message. Does not implicitly {@link commander.sgate.ResServer.verify|verify} messages.
             * @function encode
             * @memberof commander.sgate.ResServer
             * @static
             * @param {commander.sgate.IResServer} message ResServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResServer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                return writer;
            };

            /**
             * Encodes the specified ResServer message, length delimited. Does not implicitly {@link commander.sgate.ResServer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof commander.sgate.ResServer
             * @static
             * @param {commander.sgate.IResServer} message ResServer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResServer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ResServer message from the specified reader or buffer.
             * @function decode
             * @memberof commander.sgate.ResServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {commander.sgate.ResServer} ResServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResServer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.commander.sgate.ResServer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ResServer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof commander.sgate.ResServer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {commander.sgate.ResServer} ResServer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResServer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ResServer message.
             * @function verify
             * @memberof commander.sgate.ResServer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResServer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                return null;
            };

            /**
             * Creates a ResServer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof commander.sgate.ResServer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {commander.sgate.ResServer} ResServer
             */
            ResServer.fromObject = function fromObject(object) {
                if (object instanceof $root.commander.sgate.ResServer)
                    return object;
                var message = new $root.commander.sgate.ResServer();
                if (object.id != null)
                    message.id = object.id | 0;
                return message;
            };

            /**
             * Creates a plain object from a ResServer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof commander.sgate.ResServer
             * @static
             * @param {commander.sgate.ResServer} message ResServer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResServer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this ResServer to JSON.
             * @function toJSON
             * @memberof commander.sgate.ResServer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResServer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ResServer;
        })();

        return sgate;
    })();

    return commander;
})();

module.exports = $root;
