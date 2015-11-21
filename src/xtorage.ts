export type StorageOptions = {
  storage: string;
  unique: boolean
}

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
  constructor(private _storage:string = 'localStorage', private _unique:boolean = false) {

  }

  set storage(storage: string) {
    this._storage = storage;
  }

  get storage():string {
    return this._storage;
  }

  set unique(unique: boolean) {
    this._unique = unique;
  }

  get unique():boolean {
    return this._unique;
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

  _parseOptions(opt:StorageOptions):StorageOptions {
    let _opt = {storage: opt && opt.storage ? opt.storage : this.storage,
                unique: opt && opt.unique ? opt.unique : this.unique};

    return _opt;
  }

  _equals(info1, info2):boolean {
    return JSON.stringify(info1) === JSON.stringify(info2);
  }

  save(key:string, info: any, opt?:StorageOptions):void {
    var _opt = this._parseOptions(opt);

    window[_opt.storage].setItem(key, this._toStringifiedJSON(info));
  }

  private _saveInArray(key:string, newInfo:any, method:string, opt?:StorageOptions):void {
    var _opt = this._parseOptions(opt);
    var _infoStorage = this.get(key, _opt) || [];
    var _isRepeated = false;

    if (!(_infoStorage instanceof Array)) return;

    if (_opt.unique && !!_infoStorage.length) {
      <any[]>_infoStorage.forEach((informationStorage) => {
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
