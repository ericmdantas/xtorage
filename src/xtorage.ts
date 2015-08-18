export type StorageOptions = {storage: string;}

export interface IParseStorage {
  _toStringifiedJSON(info:any):any
  _fromStringifiedJSON(info:any):any
  _parseOptions(opts:Object):StorageOptions
}

export interface IAddStorage {
  save(key:string, info: any, opts?:StorageOptions):void;
  saveInFirstPosition(key:string, info: any, opts?:StorageOptions):void;
  saveInLastPosition(key:string, info: any, opts?:StorageOptions):void;
}

export interface IGetStorage {
  get(key:string, opts?:StorageOptions):any
  getFirst(key:string, opts?:StorageOptions):any
  getLast(key:string, opts?:StorageOptions):any
}

export interface IRemoveStorage {
  remove(key:string, opts?:StorageOptions):void;
  removeFirst(key:string, opts?:StorageOptions):void;
  removeLast(key:string, opts?:StorageOptions):void;
  removeAll(opts?:StorageOptions):void;
}

export class Xtorage implements IAddStorage, IGetStorage, IRemoveStorage, IParseStorage {
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

  _parseOptions(opt:StorageOptions = {storage: 'localStorage'}):StorageOptions {
    return opt;
  }

  save(key:string, info: any, opt?:StorageOptions):void {
    var _opt = this._parseOptions(opt);

    window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
  }

  private _saveInArray(key:string, info:any, method:string, opt?:StorageOptions):void {
    var _info = this.get(key, opt);

    if (!(_info instanceof Array)) return;

    _info[method](info);

    this.save(key, _info, opt);
  }

  saveInFirstPosition(key:string, info: any, opt?:StorageOptions):void {
    this._saveInArray(key, info, "unshift", opt);
  }

  saveInLastPosition(key:string, info: any, opt?:StorageOptions):void {
    this._saveInArray(key, info, "push", opt);
  }


  get(key:string, opt?:StorageOptions):any {
    var _opt = this._parseOptions(opt);
    var _info = window[_opt.storage].getItem(key);

    return this._fromStringifiedJSON(_info);
  }

  private _getFromArray(key, position:number|string, opt?:StorageOptions):void {
    var _info = this.get(key, opt);
    var _position;

    if (!(_info instanceof Array) || !_info.length) return;

    _position = typeof position === "number" ? position : _info.length - 1;

    return _info[_position];
  }

  getFirst(key:string, opt?:StorageOptions):any {
    return this._getFromArray(key, 0, opt);
  }

  getLast(key:string, opt?:StorageOptions):any {
    return this._getFromArray(key, "last", opt);
  }

  remove(key:string, opt?:StorageOptions):void {
    var _opt = this._parseOptions(opt);

    window[_opt.storage].removeItem(key);
  }

  private _removeFromArray(key:string, method:string,opt?:StorageOptions):void {
    var _info = this.get(key, opt);

    if (!(_info instanceof Array)) return;

    _info[method]();

    this.save(key, _info, opt);
  }

  removeFirst(key:string, opt?:StorageOptions):void {
    this._removeFromArray(key, "shift", opt);
  }

  removeLast(key:string, opt?:StorageOptions):void {
    this._removeFromArray(key, "pop", opt);
  }

  removeAll(opt?:StorageOptions):void {
    var _opt = this._parseOptions(opt);

    window[_opt.storage].clear();
  }
}
