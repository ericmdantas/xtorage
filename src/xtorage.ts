export interface IParseStorage {
  _toStringifiedJSON(info:any):any
  _fromStringifiedJSON(info:any):any
}

export interface IAddStorage {
  save(key:string, info: any):void;
  saveInFirstPosition(key:string, info: any):void;
  saveInLastPosition(key:string, info: any):void;
}

export interface IGetStorage {
  get(key:string):any
  getFirst(key:string):any
  getLast(key:string):any
}

export interface IRemoveStorage {
  remove(key:string):void;
  removeFirst(key:string):void;
  removeLast(key:string):void;
  removeAll():void;
}

export class Xtorage implements IAddStorage, IGetStorage, IRemoveStorage, IParseStorage {
  constructor(private _storage:string = 'localStorage', private _unique:boolean = false) {

  }

  save(key:string, info: any):void {
    window[this.storage].setItem(key, this._toStringifiedJSON(info));
  }

  saveInFirstPosition(key:string, info: any):void {
    this._saveInArray(key, info, "unshift");
  }

  saveInLastPosition(key:string, info: any):void {
    this._saveInArray(key, info, "push");
  }

  get(key:string):any {
    var _info = window[this.storage].getItem(key);
    return this._fromStringifiedJSON(_info);
  }

  getFirst(key:string):any {
    return this._getFromArray(key, 0);
  }

  getLast(key:string):any {
    return this._getFromArray(key, "last");
  }

  remove(key:string):void {
    window[this.storage].removeItem(key);
  }

  removeFirst(key:string):void {
    this._removeFromArray(key, "shift");
  }

  removeLast(key:string):void {
    this._removeFromArray(key, "pop");
  }

  removeAll():void {
    window[this.storage].clear();
  }

  set storage(storage:string) {
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

  _equals(info1, info2):boolean {
    return JSON.stringify(info1) === JSON.stringify(info2);
  }

  private _saveInArray(key:string, newInfo:any, method:string):void {
    var _infoStorage = this.get(key) || [];
    var _isRepeated = false;

    if (!(_infoStorage instanceof Array)) return;

    if (this.unique && !!_infoStorage.length) {
      (_infoStorage as any[]).forEach((informationStorage) => {
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

  private _getFromArray(key, position:number|string):void {
    var _info = this.get(key);
    var _position;

    if (!(_info instanceof Array) || !_info.length) return;

    _position = typeof position === "number" ? position : _info.length - 1;

    return _info[_position];
  }

  private _removeFromArray(key:string, method:string):void {
    var _info = this.get(key);

    if (!(_info instanceof Array)) return;

    _info[method]();

    this.save(key, _info);
  }
}
