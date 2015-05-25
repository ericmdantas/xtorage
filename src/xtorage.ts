"use strict";

interface IParse {
    toStringifiedJSON(ob : Object | Array<any>):String
    fromStringifiedJSON(str: String):Object | Array<any>
}

interface IAdd {
    add(key: String, info: Object | Array<any>);
    addInFirstPosition(key: String, info: Object | Array<any>);
    addInLastPosition(key: String, info: Object | Array<any>);
}

interface IGet {
    get(key: String):any;
}

interface IRemove {
    remove(key: String);
    removeFirst(key: String);
    removeLast(key: String);
    removeAll();
}


export class Xtorage implements IAdd, IGet, IRemove, IParse {
    storage: String;
    unique: Boolean;

    constructor(st:String = 'localStorage', unique:Boolean = false) {
        this.storage = st;
        this.unique = unique;
    }

    toStringifiedJSON(obj: Object | Array<any>):String {
        return '';
    }

    fromStringifiedJSON(str: String):Object | Array<any> {
        return {};
    }

    add(key: String, info: Object | Array<any>) {

    }

    addInFirstPosition(key: String, info: Object) {

    }

    addInLastPosition(key: String, info: Object) {

    }


    get(key: String):any {
        return {};
    }


    remove(key: String) {

    }

    removeFirst(key: String) {

    }

    removeLast(key: String) {

    }

    removeAll() {

    }
}
