/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.protocal = (function() {

    /**
     * Namespace protocal.
     * @exports protocal
     * @namespace
     */
    var protocal = {};

    protocal.register = (function() {

        /**
         * Properties of a register.
         * @memberof protocal
         * @interface Iregister
         * @property {number|null} [kind] register kind
         */

        /**
         * Constructs a new register.
         * @memberof protocal
         * @classdesc Represents a register.
         * @implements Iregister
         * @constructor
         * @param {protocal.Iregister=} [properties] Properties to set
         */
        function register(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * register kind.
         * @member {number} kind
         * @memberof protocal.register
         * @instance
         */
        register.prototype.kind = 0;

        /**
         * Creates a new register instance using the specified properties.
         * @function create
         * @memberof protocal.register
         * @static
         * @param {protocal.Iregister=} [properties] Properties to set
         * @returns {protocal.register} register instance
         */
        register.create = function create(properties) {
            return new register(properties);
        };

        /**
         * Encodes the specified register message. Does not implicitly {@link protocal.register.verify|verify} messages.
         * @function encode
         * @memberof protocal.register
         * @static
         * @param {protocal.Iregister} message register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        register.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.kind != null && message.hasOwnProperty("kind"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.kind);
            return writer;
        };

        /**
         * Encodes the specified register message, length delimited. Does not implicitly {@link protocal.register.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocal.register
         * @static
         * @param {protocal.Iregister} message register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        register.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a register message from the specified reader or buffer.
         * @function decode
         * @memberof protocal.register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocal.register} register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        register.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocal.register();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
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
         * Decodes a register message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocal.register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocal.register} register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        register.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a register message.
         * @function verify
         * @memberof protocal.register
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        register.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.kind != null && message.hasOwnProperty("kind"))
                if (!$util.isInteger(message.kind))
                    return "kind: integer expected";
            return null;
        };

        /**
         * Creates a register message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocal.register
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocal.register} register
         */
        register.fromObject = function fromObject(object) {
            if (object instanceof $root.protocal.register)
                return object;
            var message = new $root.protocal.register();
            if (object.kind != null)
                message.kind = object.kind | 0;
            return message;
        };

        /**
         * Creates a plain object from a register message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocal.register
         * @static
         * @param {protocal.register} message register
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        register.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.kind = 0;
            if (message.kind != null && message.hasOwnProperty("kind"))
                object.kind = message.kind;
            return object;
        };

        /**
         * Converts this register to JSON.
         * @function toJSON
         * @memberof protocal.register
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        register.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return register;
    })();

    protocal.resRegister = (function() {

        /**
         * Properties of a resRegister.
         * @memberof protocal
         * @interface IresRegister
         * @property {number|null} [agentid] resRegister agentid
         */

        /**
         * Constructs a new resRegister.
         * @memberof protocal
         * @classdesc Represents a resRegister.
         * @implements IresRegister
         * @constructor
         * @param {protocal.IresRegister=} [properties] Properties to set
         */
        function resRegister(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * resRegister agentid.
         * @member {number} agentid
         * @memberof protocal.resRegister
         * @instance
         */
        resRegister.prototype.agentid = 0;

        /**
         * Creates a new resRegister instance using the specified properties.
         * @function create
         * @memberof protocal.resRegister
         * @static
         * @param {protocal.IresRegister=} [properties] Properties to set
         * @returns {protocal.resRegister} resRegister instance
         */
        resRegister.create = function create(properties) {
            return new resRegister(properties);
        };

        /**
         * Encodes the specified resRegister message. Does not implicitly {@link protocal.resRegister.verify|verify} messages.
         * @function encode
         * @memberof protocal.resRegister
         * @static
         * @param {protocal.IresRegister} message resRegister message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        resRegister.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.agentid != null && message.hasOwnProperty("agentid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.agentid);
            return writer;
        };

        /**
         * Encodes the specified resRegister message, length delimited. Does not implicitly {@link protocal.resRegister.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocal.resRegister
         * @static
         * @param {protocal.IresRegister} message resRegister message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        resRegister.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a resRegister message from the specified reader or buffer.
         * @function decode
         * @memberof protocal.resRegister
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocal.resRegister} resRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        resRegister.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocal.resRegister();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.agentid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a resRegister message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocal.resRegister
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocal.resRegister} resRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        resRegister.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a resRegister message.
         * @function verify
         * @memberof protocal.resRegister
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        resRegister.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.agentid != null && message.hasOwnProperty("agentid"))
                if (!$util.isInteger(message.agentid))
                    return "agentid: integer expected";
            return null;
        };

        /**
         * Creates a resRegister message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocal.resRegister
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocal.resRegister} resRegister
         */
        resRegister.fromObject = function fromObject(object) {
            if (object instanceof $root.protocal.resRegister)
                return object;
            var message = new $root.protocal.resRegister();
            if (object.agentid != null)
                message.agentid = object.agentid | 0;
            return message;
        };

        /**
         * Creates a plain object from a resRegister message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocal.resRegister
         * @static
         * @param {protocal.resRegister} message resRegister
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        resRegister.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.agentid = 0;
            if (message.agentid != null && message.hasOwnProperty("agentid"))
                object.agentid = message.agentid;
            return object;
        };

        /**
         * Converts this resRegister to JSON.
         * @function toJSON
         * @memberof protocal.resRegister
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        resRegister.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return resRegister;
    })();

    return protocal;
})();

module.exports = $root;
