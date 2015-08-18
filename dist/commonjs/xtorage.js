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
    Xtorage.prototype._saveInArray = function (key, info, method, opt) {
        var _info = this.get(key, opt);
        if (!(_info instanceof Array))
            return;
        _info[method](info);
        this.save(key, _info, opt);
    };
    Xtorage.prototype.saveInFirstPosition = function (key, info, opt) {
        this._saveInArray(key, info, "unshift", opt);
    };
    Xtorage.prototype.saveInLastPosition = function (key, info, opt) {
        this._saveInArray(key, info, "push", opt);
    };
    Xtorage.prototype.get = function (key, opt) {
        var _opt = this._parseOptions(opt);
        var _info = window[_opt.storage].getItem(key);
        return this._fromStringifiedJSON(_info);
    };
    Xtorage.prototype._getFromArray = function (key, position, opt) {
        var _info = this.get(key, opt);
        var _position;
        if (!(_info instanceof Array) || !_info.length)
            return;
        _position = typeof position === "number" ? position : _info.length - 1;
        return _info[_position];
    };
    Xtorage.prototype.getFirst = function (key, opt) {
        return this._getFromArray(key, 0, opt);
    };
    Xtorage.prototype.getLast = function (key, opt) {
        return this._getFromArray(key, "last", opt);
    };
    Xtorage.prototype.remove = function (key, opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].removeItem(key);
    };
    Xtorage.prototype._removeFromArray = function (key, method, opt) {
        var _info = this.get(key, opt);
        if (!(_info instanceof Array))
            return;
        _info[method]();
        this.save(key, _info, opt);
    };
    Xtorage.prototype.removeFirst = function (key, opt) {
        this._removeFromArray(key, "shift", opt);
    };
    Xtorage.prototype.removeLast = function (key, opt) {
        this._removeFromArray(key, "pop", opt);
    };
    Xtorage.prototype.removeAll = function (opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].clear();
    };
    return Xtorage;
})();
exports.Xtorage = Xtorage;
