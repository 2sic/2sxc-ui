"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// polyfills
require("./array.prototype.find"); // fix for IE11 Array.find
require("./Object.assign"); // fix for IE11 Object.assign
require("./es6-promise.auto.js"); // polyfill of the ES6 Promise
require("./Element.closest"); // fix for IE11 Element.closest
require("./window.CustomEvent"); // fix for IE11 window.CustomEvent
//# sourceMappingURL=include-polyfills.js.map