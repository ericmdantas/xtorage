"use strict";

module xtorage {
    interface IParse {
        _toStringifiedJSON(ob:Object | Array<any>):string
        _fromStringifiedJSON(str:string):Object | Array<any>
        _parseOptions(opt:Object):Object
    }

    interface IAdd {
        save(key:string, info: any, opts?:{storage:string});
        saveInFirstPosition(key:string, info: any, opts?:{storage:string});
        saveInLastPosition(key:string, info: any, opts?:{storage:string});
    }

    interface IGet {
        get(key:string, opts?:{storage:string}):any;
    }

    interface IRemove {
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

        _toStringifiedJSON(obj:Object | Array<any>):string {
            return JSON.stringify(obj);
        }

        _fromStringifiedJSON(str:string):Object | Array<any> {
            return JSON.parse(str);
        }

        _parseOptions(opt:{storage: string} = {storage: 'localStorage'}) {
            return opt;
        }

        save(key:string, info: any, opt?:{storage:string}) {
            var _opt = this._parseOptions(opt);

            window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
        }

        saveInFirstPosition(key:string, info: any, opt?:{storage:string}) {
            var _info = this.get(key);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];

            if (!_infoParsed.length) return;

            _infoParsed.unshift(info);

            this.save(key, _infoParsed, opt);
        }

        saveInLastPosition(key:string, info: any, opt?:{storage:string}) {
            var _info = this.get(info);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];

            _infoParsed.push(info);

            this.save(key, _infoParsed, opt);
        }


        get(key:string, opt?:{storage:string}):any {
            var _opt = this._parseOptions(opt);

            return window[_opt.storage].getItem(key);
        }


        remove(key:string, opt?:{storage:string}) {
            var _opt = this._parseOptions(opt);

            window[_opt.storage].removeItem(key);
        }

        removeFirst(key:string, opt?:{storage:string}) {
            var _info = this.get(key, opt);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];

            if (!_infoParsed.length) return;

            _info.shift();

            this.save(key, _info, opt);
        }

        removeLast(key:string, opt?:{storage:string}) {
            var _info = this.get(key, opt);
            var _infoParsed = this._fromStringifiedJSON(_info) || [];

            if (!_infoParsed.length) return;

            _info.pop();

            this.save(key, _info, opt);
        }

        removeAll(opt?:{storage:string}) {
            var _opt = this._parseOptions(opt);

            window[_opt.storage].clear();
        }
    }
}
