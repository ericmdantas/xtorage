var Xtorage = (function () {
    function Xtorage(_storage, _unique) {
        if (_storage === void 0) { _storage = 'localStorage'; }
        if (_unique === void 0) { _unique = false; }
        this._storage = _storage;
        this._unique = _unique;
    }
    Object.defineProperty(Xtorage.prototype, "storage", {
        get: function () {
            return this._storage;
        },
        set: function (storage) {
            this._storage = storage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Xtorage.prototype, "unique", {
        get: function () {
            return this._unique;
        },
        set: function (unique) {
            this._unique = unique;
        },
        enumerable: true,
        configurable: true
    });
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
        var _opt = { storage: opt && opt.storage ? opt.storage : this.storage,
            unique: opt && opt.unique ? opt.unique : this.unique };
        return _opt;
    };
    Xtorage.prototype._equals = function (info1, info2) {
        return JSON.stringify(info1) === JSON.stringify(info2);
    };
    Xtorage.prototype.save = function (key, info, opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
    };
    Xtorage.prototype._saveInArray = function (key, newInfo, method, opt) {
        var _this = this;
        var _opt = this._parseOptions(opt);
        var _infoStorage = this.get(key, _opt) || [];
        var _isRepeated = false;
        if (!(_infoStorage instanceof Array))
            return;
        if (_opt.unique && !!_infoStorage.length) {
            _infoStorage.forEach(function (informationStorage) {
                if (_this._equals(newInfo, informationStorage)) {
                    return _isRepeated = true;
                }
            });
        }
        if ((_opt.unique && !_isRepeated) || (!_opt.unique)) {
            _infoStorage[method](newInfo);
            this.save(key, _infoStorage, _opt);
            return;
        }
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
