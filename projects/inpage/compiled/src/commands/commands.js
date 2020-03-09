"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Commands = /** @class */ (function () {
    function Commands() {
        var _this = this;
        this.commandList = [];
        this.list = {}; // hash - table of action definitions, to be used a list()["action - name"]
        this.get = function (name) { return _this.list[name]; }; // a specific action definition
        this.addDef = function (def) {
            if (!_this.list[def.name]) {
                // add
                _this.commandList.push(def);
                _this.list[def.name] = def;
            }
            else if (_this.list[def.name] !== def) {
                // update
                _this.list[def.name] = def;
            }
        };
    }
    Commands.getInstance = function () {
        if (!Commands.instance) {
            Commands.instance = new Commands();
        }
        return Commands.instance;
    };
    return Commands;
}());
exports.Commands = Commands;
//# sourceMappingURL=commands.js.map