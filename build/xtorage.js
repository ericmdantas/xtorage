export class Xtorage {
    constructor(_storage = 'localStorage', _unique = false) {
        this._storage = _storage;
        this._unique = _unique;
    }
    save(key, info, opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
    }
    saveInFirstPosition(key, info, opt) {
        this._saveInArray(key, info, "unshift", opt);
    }
    saveInLastPosition(key, info, opt) {
        this._saveInArray(key, info, "push", opt);
    }
    get(key, opt) {
        var _opt = this._parseOptions(opt);
        var _info = window[_opt.storage].getItem(key);
        return this._fromStringifiedJSON(_info);
    }
    getFirst(key, opt) {
        return this._getFromArray(key, 0, opt);
    }
    getLast(key, opt) {
        return this._getFromArray(key, "last", opt);
    }
    remove(key, opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].removeItem(key);
    }
    removeFirst(key, opt) {
        this._removeFromArray(key, "shift", opt);
    }
    removeLast(key, opt) {
        this._removeFromArray(key, "pop", opt);
    }
    removeAll(opt) {
        var _opt = this._parseOptions(opt);
        window[_opt.storage].clear();
    }
    set storage(storage) {
        this._storage = storage;
    }
    get storage() {
        return this._storage;
    }
    set unique(unique) {
        this._unique = unique;
    }
    get unique() {
        return this._unique;
    }
    _toStringifiedJSON(info) {
        if (typeof info !== "object")
            return info;
        return JSON.stringify(info);
    }
    _fromStringifiedJSON(info) {
        try {
            return JSON.parse(info);
        }
        catch (e) {
            return info;
        }
    }
    _parseOptions(opt) {
        let _opt = { storage: opt && opt.storage ? opt.storage : this.storage,
            unique: opt && opt.unique ? opt.unique : this.unique };
        return _opt;
    }
    _equals(info1, info2) {
        return JSON.stringify(info1) === JSON.stringify(info2);
    }
    _saveInArray(key, newInfo, method, opt) {
        var _opt = this._parseOptions(opt);
        var _infoStorage = this.get(key, _opt) || [];
        var _isRepeated = false;
        if (!(_infoStorage instanceof Array))
            return;
        if (_opt.unique && !!_infoStorage.length) {
            _infoStorage.forEach((informationStorage) => {
                if (this._equals(newInfo, informationStorage)) {
                    return _isRepeated = true;
                }
            });
        }
        if ((_opt.unique && !_isRepeated) || (!_opt.unique)) {
            _infoStorage[method](newInfo);
            this.save(key, _infoStorage, _opt);
            return;
        }
    }
    _getFromArray(key, position, opt) {
        var _info = this.get(key, opt);
        var _position;
        if (!(_info instanceof Array) || !_info.length)
            return;
        _position = typeof position === "number" ? position : _info.length - 1;
        return _info[_position];
    }
    _removeFromArray(key, method, opt) {
        var _info = this.get(key, opt);
        if (!(_info instanceof Array))
            return;
        _info[method]();
        this.save(key, _info, opt);
    }
}
