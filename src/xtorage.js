"use strict";
export class Xtorage {
    constructor(st = 'localStorage', unique = false) {
        this.storage = st;
        this.unique = unique;
    }
    _toStringifiedJSON(obj) {
        return JSON.stringify(obj);
    }
    _fromStringifiedJSON(str) {
        return JSON.parse(str);
    }
    save(key, info, opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].setItem(key, this._toStringifiedJSON(info));
    }
    saveInFirstPosition(key, info, opt) {
        var _info = this.get(key);
    }
    saveInLastPosition(key, info, opt) {
        var _storage = opt.storage || this.storage;
    }
    get(key, opt) {
        var _storage = opt.storage || this.storage;
        return window[_storage].getItem(key);
    }
    remove(key, opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].removeItem(key);
    }
    removeFirst(key, opt) {
        var _info = this.get(key, opt);
        var _infoParsed = this._fromStringifiedJSON(_info) || [];
        if (!_infoParsed.length)
            return;
        _info.shift();
        this.save(key, _info, opt);
    }
    removeLast(key, opt) {
        var _info = this.get(key, opt);
        var _infoParsed = this._fromStringifiedJSON(_info) || [];
        if (!_infoParsed.length)
            return;
        _info.pop();
        this.save(key, _info, opt);
    }
    removeAll(opt) {
        var _storage = opt.storage || this.storage;
        window[_storage].clear();
    }
}
