"use strict";

module xtorage {

    export interface IParse {
        _toStringifiedJSON(any):any
        _fromStringifiedJSON(any):any
        _parseOptions(opt:Object):Object
    }

    export interface IAdd {
        save(key:string, info: any, opts?:{storage:string});
        saveInFirstPosition(key:string, info: any, opts?:{storage:string});
        saveInLastPosition(key:string, info: any, opts?:{storage:string});
    }

    export interface IGet {
        get(key:string, opts?:{storage:string}):any;
    }

    export interface IRemove {
        remove(key:string, opts?:{storage:string});
        removeFirst(key:string, opts?:{storage:string});
        removeLast(key:string, opts?:{storage:string});
        removeAll();
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

        _parseOptions(opt:{storage: string} = {storage: 'localStorage'}) {
            return opt;
        }

        save(key:string, info: any, opt?:{storage:string}) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
        }

        saveInFirstPosition(key:string, info: any, opt?:{storage:string}) {
            const _info = this.get(key, opt);
            const _infoParsed = this._fromStringifiedJSON(_info);

            if (!(_infoParsed instanceof Array)) return;

            _infoParsed.unshift(info);

            this.save(key, _infoParsed, opt);
        }

        saveInLastPosition(key:string, info: any, opt?:{storage:string}) {
            const _info = this.get(key, opt);
            const _infoParsed = this._fromStringifiedJSON(_info);

            if (!(_infoParsed instanceof Array)) return;

            _infoParsed.push(info);

            this.save(key, _infoParsed, opt);
        }


        get(key:string, opt?:{storage:string}):any {
            const _opt = this._parseOptions(opt);

            const _info = window[_opt.storage].getItem(key);

            return this._fromStringifiedJSON(_info);
        }


        remove(key:string, opt?:{storage:string}) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].removeItem(key);
        }

        removeFirst(key:string, opt?:{storage:string}) {
            let _info = this.get(key, opt);
            const _infoParsed = this._fromStringifiedJSON(_info);

            if (!(_infoParsed instanceof Array)) return;

            _info.shift();

            this.save(key, _info, opt);
        }

        removeLast(key:string, opt?:{storage:string}) {
            let _info = this.get(key, opt);
            const _infoParsed = this._fromStringifiedJSON(_info);

            if (!(_infoParsed instanceof Array)) return;

            _info.pop();

            this.save(key, _info, opt);
        }

        removeAll(opt?:{storage:string}) {
            const _opt = this._parseOptions(opt);

            window[_opt.storage].clear();
        }
    }
}
