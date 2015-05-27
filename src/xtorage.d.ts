declare module xtorage {
    interface IApple {
        abc(): string;
    }
    interface IParse {
        _toStringifiedJSON(any: any): any;
        _fromStringifiedJSON(any: any): any;
        _parseOptions(opt: Object): Object;
    }
    interface IAdd {
        save(key: string, info: any, opts?: {
            storage: string;
        }): any;
        saveInFirstPosition(key: string, info: any, opts?: {
            storage: string;
        }): any;
        saveInLastPosition(key: string, info: any, opts?: {
            storage: string;
        }): any;
    }
    interface IGet {
        get(key: string, opts?: {
            storage: string;
        }): any;
    }
    interface IRemove {
        remove(key: string, opts?: {
            storage: string;
        }): any;
        removeFirst(key: string, opts?: {
            storage: string;
        }): any;
        removeLast(key: string, opts?: {
            storage: string;
        }): any;
        removeAll(): any;
    }
    class Xtorage implements IAdd, IGet, IRemove, IParse {
        storage: string;
        unique: boolean;
        constructor(st?: string, unique?: boolean);
        _toStringifiedJSON(info: any): any;
        _fromStringifiedJSON(info: any): any;
        _parseOptions(opt?: {
            storage: string;
        }): {
            storage: string;
        };
        save(key: string, info: any, opt?: {
            storage: string;
        }): void;
        saveInFirstPosition(key: string, info: any, opt?: {
            storage: string;
        }): void;
        saveInLastPosition(key: string, info: any, opt?: {
            storage: string;
        }): void;
        get(key: string, opt?: {
            storage: string;
        }): any;
        remove(key: string, opt?: {
            storage: string;
        }): void;
        removeFirst(key: string, opt?: {
            storage: string;
        }): void;
        removeLast(key: string, opt?: {
            storage: string;
        }): void;
        removeAll(opt?: {
            storage: string;
        }): void;
    }
}
