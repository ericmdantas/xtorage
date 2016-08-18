export class Xtorage {
    constructor(_storage = 'localStorage', _unique = false) {
        this._storage = _storage;
        this._unique = _unique;
    }
    save(key, info) {
        window[this.storage].setItem(key, this._toStringifiedJSON(info));
    }
    saveInFirstPosition(key, info) {
        this._saveInArray(key, info, "unshift");
    }
    saveInLastPosition(key, info) {
        this._saveInArray(key, info, "push");
    }
    get(key) {
        var _info = window[this.storage].getItem(key);
        return this._fromStringifiedJSON(_info);
    }
    getFirst(key) {
        return this._getFromArray(key, 0);
    }
    getLast(key) {
        return this._getFromArray(key, "last");
    }
    remove(key) {
        window[this.storage].removeItem(key);
    }
    removeFirst(key) {
        this._removeFromArray(key, "shift");
    }
    removeLast(key) {
        this._removeFromArray(key, "pop");
    }
    removeAll() {
        window[this.storage].clear();
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
    _equals(info1, info2) {
        return JSON.stringify(info1) === JSON.stringify(info2);
    }
    _saveInArray(key, newInfo, method) {
        var _infoStorage = this.get(key) || [];
        var _isRepeated = false;
        if (!(_infoStorage instanceof Array))
            return;
        if (this.unique && !!_infoStorage.length) {
            _infoStorage.forEach((informationStorage) => {
                if (this._equals(newInfo, informationStorage)) {
                    return _isRepeated = true;
                }
            });
        }
        if ((this.unique && !_isRepeated) || (!this.unique)) {
            _infoStorage[method](newInfo);
            this.save(key, _infoStorage);
            return;
        }
    }
    _getFromArray(key, position) {
        var _info = this.get(key);
        var _position;
        if (!(_info instanceof Array) || !_info.length)
            return;
        _position = typeof position === "number" ? position : _info.length - 1;
        return _info[_position];
    }
    _removeFromArray(key, method) {
        var _info = this.get(key);
        if (!(_info instanceof Array))
            return;
        _info[method]();
        this.save(key, _info);
    }
}
