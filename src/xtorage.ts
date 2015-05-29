"use strict";

module xtorage {

    export interface Options {
        storage: string;
    }

    export interface IParse {
        _toStringifiedJSON(any):any
        _fromStringifiedJSON(any):any
        _parseOptions(opts:Object):Object
    }

    export interface IAdd {
        save(key:string, info: any, opts?:Options);
        saveInFirstPosition(key:string, info: any, opts?:Options);
        saveInLastPosition(key:string, info: any, opts?:Options);
    }

    export interface IGet {
        get(key:string, opts?:Options):any
        getFirst(key:string, opts?:Options):any
        getLast(key:string, opts?:Options):any
    }

    export interface IRemove {
        remove(key:string, opts?:Options);
        removeFirst(key:string, opts?:Options);
        removeLast(key:string, opts?:Options);
        removeAll(opts?:Options);
    }


    export class Xtorage implements IAdd, IGet, IRemove, IParse {
        storage:string;
        unique:boolean;

        constructor(st:string = 'localStorage', unique:boolean = false) {
            this.storage = st;
            this.unique = unique;
        }

        _toStringifiedJSON(info:any):any {
            if (typeof info !== "object")
                return info;

            return JSON.stringify(info);
        }

        _fromStringifiedJSON(info:any):any {
            try {
                return JSON.parse(info);
            }
            catch(e) {
                return info;
            }
        }

        _parseOptions(opt:Options = {storage: 'localStorage'}) {
            return opt;
        }

        save(key:string, info: any, opt?:Options) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
        }

        _saveInArray(key:string, info:any, method:string, opt?:Options) {
            const _info = this.get(key, opt);

            if (!(_info instanceof Array)) return;

            _info[method](info);

            this.save(key, _info, opt);
        }

        saveInFirstPosition(key:string, info: any, opt?:Options) {
            this._saveInArray(key, info, "unshift", opt);
        }

        saveInLastPosition(key:string, info: any, opt?:Options) {
            this._saveInArray(key, info, "push", opt);
        }


        get(key:string, opt?:Options):any {
            const _opt = this._parseOptions(opt);

            const _info = window[_opt.storage].getItem(key);

            return this._fromStringifiedJSON(_info);
        }

        _getFromArray(key, position:number|string, opt?:Options) {
            const _info = this.get(key, opt);
            let _position;
            if (!(_info instanceof Array) || !_info.length) return;

            _position = typeof position === "number" ? position : _info.length - 1;

            return _info[_position];
        }

        getFirst(key:string, opt?:Options):any {
            return this._getFromArray(key, 0, opt);
        }

        getLast(key:string, opt?:Options):any {
            return this._getFromArray(key, "last", opt);
        }

        remove(key:string, opt?:Options) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].removeItem(key);
        }

        _removeFromArray(key:string, method:string,opt?:Options) {
            let _info = this.get(key, opt);

            if (!(_info instanceof Array)) return;

            _info[method]();

            this.save(key, _info, opt);
        }

        removeFirst(key:string, opt?:Options) {
            this._removeFromArray(key, "shift", opt);
        }

        removeLast(key:string, opt?:Options) {
            this._removeFromArray(key, "pop", opt);
        }

        removeAll(opt?:Options) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].clear();
        }
    }
}
