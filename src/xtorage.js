"use strict";
var Xtorage = (function () {
    function Xtorage(st, unique) {
        if (st === void 0) { st = 'localStorage'; }
        if (unique === void 0) { unique = false; }
        this.storage = st;
        this.unique = unique;
    }
    Xtorage.prototype.toStringifiedJSON = function (obj) {
        return '';
    };
    Xtorage.prototype.fromStringifiedJSON = function (str) {
        return {};
    };
    Xtorage.prototype.add = function (key, info) {
    };
    Xtorage.prototype.addInFirstPosition = function (key, info) {
    };
    Xtorage.prototype.addInLastPosition = function (key, info) {
    };
    Xtorage.prototype.get = function (key) {
        return {};
    };
    Xtorage.prototype.remove = function (key) {
    };
    Xtorage.prototype.removeFirst = function (key) {
    };
    Xtorage.prototype.removeLast = function (key) {
    };
    Xtorage.prototype.removeAll = function () {
    };
    return Xtorage;
})();
exports.Xtorage = Xtorage;
