"use strict";

interface Adder {
    add(key: String, info: Object);
    addArray(key: String, info: Array<any>);
    addInFirstPosition(key: String, info: Object);
    addInLastPosition(key: String, info: Object);
}

interface Getter {
    get(key: String):Object;
}

interface Remover {
    remove(key: String);
    removeFirst(key: String);
    removeLast(key: String);
    removeAll();
}


export class Xtorage implements Adder, Getter, Remover {
    storage: String;
    unique: Boolean;

    constructor(st:String = 'localStorage', unique:Boolean = false) {
        this.storage = st;
        this.unique = unique;
    }

    add(key: String, info: Object) {

    }

    addArray(key: String, info: Object) {

    }

    addInFirstPosition(key: String, info: Object) {

    }

    addInLastPosition(key: String, info: Object) {

    }


    get(key: String) {
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
