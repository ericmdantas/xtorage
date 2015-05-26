"use strict";
var Xtorage = (function () {
    function Xtorage(st, unique) {
        if (st === void 0) { st = 'localStorage'; }
        if (unique === void 0) { unique = false; }
        this.storage = st;
        this.unique = unique;
    }
    Xtorage.prototype._toStringifiedJSON = function (obj) {
        return JSON.stringify(obj);
    };
    Xtorage.prototype._fromStringifiedJSON = function (str) {
        return JSON.parse(str);
    };
    Xtorage.prototype.save = function (key, info, opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].setItem(key, this._toStringifiedJSON(info));
    };
    Xtorage.prototype.saveInFirstPosition = function (key, info, opt) {
        var _info = this.get(key);
    };
    Xtorage.prototype.saveInLastPosition = function (key, info, opt) {
        var _storage = opt.storage || this.storage;
    };
    Xtorage.prototype.get = function (key, opt) {
        var _storage = opt.storage || this.storage;
        return window[_storage].getItem(key);
    };
    Xtorage.prototype.remove = function (key, opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].removeItem(key);
    };
    Xtorage.prototype.removeFirst = function (key, opt) {
        var _info = this.get(key, opt);
        var _infoParsed = this._fromStringifiedJSON(_info) || [];
        if (!_infoParsed.length)
            return;
        _info.shift();
        this.save(key, _info, opt);
    };
    Xtorage.prototype.removeLast = function (key, opt) {
        var _info = this.get(key, opt);
        var _infoParsed = this._fromStringifiedJSON(_info) || [];
        if (!_infoParsed.length)
            return;
        _info.pop();
        this.save(key, _info, opt);
    };
    Xtorage.prototype.removeAll = function (opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].clear();
    };
    return Xtorage;
})();
exports.Xtorage = Xtorage;
