declare module xtorage {
    type StorageOptions = {
        storage: string;
    };
    interface IParseStorage {
        _toStringifiedJSON(info: any): any;
        _fromStringifiedJSON(info: any): any;
        _parseOptions(opts: Object): StorageOptions;
    }
    interface IAddStorage {
        save(key: string, info: any, opts?: StorageOptions): void;
        saveInFirstPosition(key: string, info: any, opts?: StorageOptions): void;
        saveInLastPosition(key: string, info: any, opts?: StorageOptions): void;
    }
    interface IGetStorage {
        get(key: string, opts?: StorageOptions): any;
        getFirst(key: string, opts?: StorageOptions): any;
        getLast(key: string, opts?: StorageOptions): any;
    }
    interface IRemoveStorage {
        remove(key: string, opts?: StorageOptions): void;
        removeFirst(key: string, opts?: StorageOptions): void;
        removeLast(key: string, opts?: StorageOptions): void;
        removeAll(opts?: StorageOptions): void;
    }
    class Xtorage implements IAddStorage, IGetStorage, IRemoveStorage, IParseStorage {
        storage: string;
        unique: boolean;
        constructor(st?: string, unique?: boolean);
        _toStringifiedJSON(info: any): any;
        _fromStringifiedJSON(info: any): any;
        _parseOptions(opt?: StorageOptions): StorageOptions;
        save(key: string, info: any, opt?: StorageOptions): void;
        _saveInArray(key: string, info: any, method: string, opt?: StorageOptions): void;
        saveInFirstPosition(key: string, info: any, opt?: StorageOptions): void;
        saveInLastPosition(key: string, info: any, opt?: StorageOptions): void;
        get(key: string, opt?: StorageOptions): any;
        _getFromArray(key: any, position: number | string, opt?: StorageOptions): void;
        getFirst(key: string, opt?: StorageOptions): any;
        getLast(key: string, opt?: StorageOptions): any;
        remove(key: string, opt?: StorageOptions): void;
        _removeFromArray(key: string, method: string, opt?: StorageOptions): void;
        removeFirst(key: string, opt?: StorageOptions): void;
        removeLast(key: string, opt?: StorageOptions): void;
        removeAll(opt?: StorageOptions): void;
    }
}
