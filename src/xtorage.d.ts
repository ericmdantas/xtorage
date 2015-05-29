declare module xtorage {
    interface Options {
        storage: string;
    }
    interface IParse {
        _toStringifiedJSON(any: any): any;
        _fromStringifiedJSON(any: any): any;
        _parseOptions(opts: Object): Object;
    }
    interface IAdd {
        save(key: string, info: any, opts?: Options): any;
        saveInFirstPosition(key: string, info: any, opts?: Options): any;
        saveInLastPosition(key: string, info: any, opts?: Options): any;
    }
    interface IGet {
        get(key: string, opts?: Options): any;
        getFirst(key: string, opts?: Options): any;
        getLast(key: string, opts?: Options): any;
    }
    interface IRemove {
        remove(key: string, opts?: Options): any;
        removeFirst(key: string, opts?: Options): any;
        removeLast(key: string, opts?: Options): any;
        removeAll(opts?: Options): any;
    }
    class Xtorage implements IAdd, IGet, IRemove, IParse {
        storage: string;
        unique: boolean;
        constructor(st?: string, unique?: boolean);
        _toStringifiedJSON(info: any): any;
        _fromStringifiedJSON(info: any): any;
        _parseOptions(opt?: Options): Options;
        save(key: string, info: any, opt?: Options): void;
        _saveInArray(key: string, info: any, method: string, opt?: Options): void;
        saveInFirstPosition(key: string, info: any, opt?: Options): void;
        saveInLastPosition(key: string, info: any, opt?: Options): void;
        get(key: string, opt?: Options): any;
        _getFromArray(key: any, position: number | string, opt?: Options): any;
        getFirst(key: string, opt?: Options): any;
        getLast(key: string, opt?: Options): any;
        remove(key: string, opt?: Options): void;
        _removeFromArray(key: string, method: string, opt?: Options): void;
        removeFirst(key: string, opt?: Options): void;
        removeLast(key: string, opt?: Options): void;
        removeAll(opt?: Options): void;
    }
}
