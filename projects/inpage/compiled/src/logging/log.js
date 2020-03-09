"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = require("./entry");
var maxScopeLen = 3;
var maxNameLen = 6;
var liveDump = false;
var Log = /** @class */ (function () {
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     */
    function Log(name, parent, initialMessage) {
        var _this = this;
        /**
         * all log-entries on this logger
         */
        this.entries = new Array();
        /**
         * Full identifier of this log-object, with full hierarchy
         */
        this.fullIdentifier = function () {
            return "" + (_this.parent ? _this.parent.fullIdentifier() : '') + _this.identifier();
        };
        /**
         * link this log to a parent
         * usually happens in constructor, but in rare cases
         * this must be called manually
         */
        this.linkLog = function (parent) {
            _this.parent = parent || _this.parent; // if new parent isn't defined, don't replace
        };
        /**
         * scope of this logger - to easily see which ones
         * are about the same topic
         */
        this.scope = 'tdo';
        /**
         * name of this logger
         */
        this.name = 'unknwn';
        /**
         * Unique 2-character ID of this specific log object
         */
        this.id = function () { return _this.idCache || (_this.idCache = _this.randomString(2)); };
        /**
         * Unique identifier of this log object, with name and ID
         */
        this.identifier = function () { return "" + _this.scope + _this.name + "(" + _this.id() + ")"; };
        this.rename(name);
        this.linkLog(parent);
        if (initialMessage != null)
            this.add(initialMessage);
    }
    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     */
    Log.prototype.rename = function (name) {
        try {
            var dot = name.indexOf('.');
            this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + '.' : '';
            var rest = dot > 0 ? name.substr(dot + 1) : name;
            this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
            this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
        }
        catch (e) {
            /* ignore */
        }
    };
    /**
     * add a message to the log-list
     * @param message
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    Log.prototype.add = function (message) {
        var messageText;
        if (message instanceof Function) {
            try {
                messageText = (message()).toString();
                message = null; // maybe it is unnecessary, but added to be safe as possible that arrow function parameter will be garbage collected
            }
            catch (e) {
                messageText = 'undefined';
            }
        }
        else {
            messageText = message.toString();
        }
        var entry = new entry_1.Entry(this, messageText);
        this.addEntry(entry);
        if (liveDump)
            console.log(this.dump(undefined, undefined, undefined, entry));
        return messageText;
    };
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     */
    Log.prototype.dump = function (separator, start, end, one) {
        if (separator === void 0) { separator = ' - '; }
        if (start === void 0) { start = ''; }
        if (end === void 0) { end = ''; }
        if (one === void 0) { one = null; }
        var lg = start;
        var dumpOne = function (e) { return lg += e.source() + separator + e.message + '\n'; };
        if (one)
            dumpOne(one);
        else
            this.entries.forEach(dumpOne);
        lg += end;
        return lg;
    };
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     */
    Log.prototype.addEntry = function (entry) {
        this.entries.push(entry);
        if (this.parent)
            this.parent.addEntry(entry);
    };
    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     */
    Log.prototype.randomString = function (stringLength) {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
        var randomstring = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    return Log;
}());
exports.Log = Log;
//# sourceMappingURL=log.js.map