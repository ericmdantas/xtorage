"use strict";
var xtorage;
(function (xtorage) {
    var Xtorage = (function () {
        function Xtorage(st, unique) {
            if (st === void 0) { st = 'localStorage'; }
            if (unique === void 0) { unique = false; }
            this.storage = st;
            this.unique = unique;
        }
        Xtorage.prototype._toStringifiedJSON = function (info) {
            if (typeof info !== "object")
                return info;
            return JSON.stringify(info);
        };
        Xtorage.prototype._fromStringifiedJSON = function (info) {
            try {
                return JSON.parse(info);
            }
            catch (e) {
                return info;
            }
        };
        Xtorage.prototype._parseOptions = function (opt) {
            if (opt === void 0) { opt = { storage: 'localStorage' }; }
            return opt;
        };
        Xtorage.prototype.save = function (key, info, opt) {
            var _opt = this._parseOptions(opt);
            window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
        };
        Xtorage.prototype.saveInFirstPosition = function (key, info, opt) {
            var _info = this.get(key);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];
            if (!_infoParsed.length)
                return;
            _infoParsed.unshift(info);
            this.save(key, _infoParsed, opt);
        };
        Xtorage.prototype.saveInLastPosition = function (key, info, opt) {
            var _info = this.get(info);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];
            _infoParsed.push(info);
            this.save(key, _infoParsed, opt);
        };
        Xtorage.prototype.get = function (key, opt) {
            var _opt = this._parseOptions(opt);
            var _info = window[_opt.storage].getItem(key);
            return this._fromStringifiedJSON(_info);
        };
        Xtorage.prototype.remove = function (key, opt) {
            var _opt = this._parseOptions(opt);
            window[_opt.storage].removeItem(key);
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
            var _opt = this._parseOptions(opt);
            window[_opt.storage].clear();
        };
        return Xtorage;
    })();
    xtorage.Xtorage = Xtorage;
})(xtorage || (xtorage = {}));
