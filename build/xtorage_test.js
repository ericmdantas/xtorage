/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="xtorage.d.ts"/>
import { Xtorage } from './xtorage.js';
describe('xtorage', () => {
    var LOCAL_STORAGE = 'localStorage';
    var SESSION_STORAGE = 'sessionStorage';
    var OBJECT_LOCAL_STORAGE = { storage: LOCAL_STORAGE };
    var OBJECT_SESSION_STORAGE = { storage: SESSION_STORAGE };
    afterEach(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
    });
    describe('_parseOptions', () => {
        it('should return the object with the storage as localStorage', () => {
            var _x = new Xtorage();
            expect(_x._parseOptions()).toEqual({ storage: 'localStorage', unique: false });
        });
        it('should return the object with the storage as sessionStorage', () => {
            var _x = new Xtorage();
            expect(_x._parseOptions({ storage: 'localStorage' })).toEqual({ storage: 'localStorage', unique: false });
        });
        it('should return the object with the storage as sessionStorage and unique false', () => {
            var _x = new Xtorage();
            expect(_x._parseOptions({ storage: 'sessionStorage' })).toEqual({ storage: 'sessionStorage', unique: false });
        });
        it('should return the object with the storage as sessionStorage as unique as true', () => {
            var _x = new Xtorage();
            expect(_x._parseOptions({ storage: 'sessionStorage', unique: true })).toEqual({ storage: 'sessionStorage', unique: true });
        });
        it('should return the object with the storage as sessionStorage and unique as true - passed by constructor', () => {
            var _x = new Xtorage('sessionStorage', true);
            expect(_x._parseOptions()).toEqual({ storage: 'sessionStorage', unique: true });
        });
        it('should return the object with the storage as localStorage and unique as true - passed by constructor', () => {
            var _x = new Xtorage(undefined, true);
            expect(_x._parseOptions()).toEqual({ storage: 'localStorage', unique: true });
        });
        it('should return the object with the storage as sessionStorage and unique as false - passed by constructor', () => {
            var _x = new Xtorage('sessionStorage', false);
            expect(_x._parseOptions()).toEqual({ storage: 'sessionStorage', unique: false });
        });
    });
    describe('_toStringifiedJSON', () => {
        it('should return a string', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON("a")).toEqual("a");
        });
        it('should return a number', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON(1)).toEqual(1);
        });
        it('should return a boolean', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON(true)).toEqual(true);
        });
        it('should return a stringified object', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON({})).toEqual("{}");
        });
        it('should return a stringified object', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON({ a: true })).toEqual('{"a":true}');
        });
        it('should return a stringified array', () => {
            var _x = new Xtorage();
            expect(_x._toStringifiedJSON([{ a: true }])).toEqual('[{"a":true}]');
        });
    });
    describe('_fromStringifiedJSON', () => {
        it('should return the same string', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON('a')).toEqual('a');
        });
        it('should return the same number', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON(1)).toEqual(1);
        });
        it('should return the same boolean', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON(true)).toEqual(true);
        });
        it('should return an empty object', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON('{}')).toEqual({});
        });
        it('should return an empty array', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON('[]')).toEqual([]);
        });
        it('should return an empty with an empty object', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON('[{}]')).toEqual([{}]);
        });
        it('should return the array with the objects in it', () => {
            var _x = new Xtorage();
            expect(_x._fromStringifiedJSON('[{"a":1, "b": true, "c": "d"}]')).toEqual([{ a: 1, b: true, c: "d" }]);
        });
    });
    describe('get', () => {
        describe('default', () => {
            it('should return an empty string from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = '';
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return a simple string from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = 'a';
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return a number from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = 1;
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return a boolean', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = false;
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return an object from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = {};
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return an array from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = [];
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should return an array with an object from the storage', () => {
                var _x = new Xtorage();
                var _key = 'k';
                var _info = [{ a: true }];
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should return an empty string from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = '';
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a simple string from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = 'a';
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a number from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = 1;
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a boolean', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = false;
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an object from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = {};
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an array from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = [];
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an array with an object from the storage', () => {
                    var _x = new Xtorage(LOCAL_STORAGE);
                    var _key = 'k';
                    var _info = [{ a: true }];
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should return an empty string from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = '';
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return a simple string from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = 'a';
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return a number from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = 1;
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return a boolean', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = false;
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return an object from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = {};
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return an array from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = [];
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should return an array with an object from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = [{ a: true }];
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should return an empty string from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = '';
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a simple string from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = 'a';
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a number from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = 1;
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return a boolean', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = false;
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an object from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = {};
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an array from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = [];
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should return an array with an object from the storage', () => {
                    var _x = new Xtorage(SESSION_STORAGE);
                    var _key = 'k';
                    var _info = [{ a: true }];
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should return an empty string from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = '';
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return a simple string from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = 'a';
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return a number from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = 1;
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return a boolean', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = false;
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return an object from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = {};
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return an array from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = [];
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should return an array with an object from the storage', () => {
                    var _x = new Xtorage();
                    var _key = 'k';
                    var _info = [{ a: true }];
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
            });
        });
    });
    describe('getFirst', () => {
        describe('default', () => {
            it('should return undefined, value from storage is not an array', () => {
                var _key = 'k';
                var _infoInStorage = 'x';
                var _expectedResult = undefined;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getFirst(_key)).toEqual(_expectedResult);
            });
            it('should return undefined, empty array', () => {
                var _key = 'k';
                var _infoInStorage = [];
                var _expectedResult = undefined;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getFirst(_key)).toEqual(_expectedResult);
            });
            it('should return 1', () => {
                var _key = 'k';
                var _infoInStorage = [1];
                var _expectedResult = 1;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getFirst(_key)).toEqual(_expectedResult);
            });
            it('should return the complex info', () => {
                var _key = 'k';
                var _infoInStorage = [[{ a: true, b: false, c: [1, 2, { d: "e" }] }], 2];
                var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getFirst(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [[{ a: true, b: false, c: [1, 2, { d: "e" }] }], 2];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [[{ a: true, b: false, c: [1, 2, { d: "e" }] }], 2];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [[{ a: true, b: false, c: [1, 2, { d: "e" }] }], 2];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [[{ a: true, b: false, c: [1, 2, { d: "e" }] }], 2];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getFirst(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getFirst(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
            });
        });
    });
    describe('getLast', () => {
        describe('default', () => {
            it('should return undefined, value from storage is not an array', () => {
                var _key = 'k';
                var _infoInStorage = 'x';
                var _expectedResult = undefined;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getLast(_key)).toEqual(_expectedResult);
            });
            it('should return undefined, empty array', () => {
                var _key = 'k';
                var _infoInStorage = [];
                var _expectedResult = undefined;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getLast(_key)).toEqual(_expectedResult);
            });
            it('should return 1', () => {
                var _key = 'k';
                var _infoInStorage = [1];
                var _expectedResult = 1;
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getLast(_key)).toEqual(_expectedResult);
            });
            it('should return the complex info', () => {
                var _key = 'k';
                var _infoInStorage = [2, [{ a: true, b: false, c: [1, 2, { d: "e" }] }]];
                var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                expect(_x.getLast(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [2, [{ a: true, b: false, c: [1, 2, { d: "e" }] }]];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [2, [{ a: true, b: false, c: [1, 2, { d: "e" }] }]];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toBeUndefined();
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [2, [{ a: true, b: false, c: [1, 2, { d: "e" }] }]];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should return undefined, value from storage is not an array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'x';
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return undefined, empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _expectedResult = undefined;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return 1', () => {
                    var _key = 'k';
                    var _infoInStorage = [1];
                    var _expectedResult = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
                it('should return the complex info', () => {
                    var _key = 'k';
                    var _infoInStorage = [2, [{ a: true, b: false, c: [1, 2, { d: "e" }] }]];
                    var _expectedResult = [{ a: true, b: false, c: [1, 2, { d: "e" }] }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    expect(_x.getLast(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                    expect(_x.getLast(_key, OBJECT_LOCAL_STORAGE)).toBeUndefined();
                });
            });
        });
    });
    describe('remove', () => {
        describe('default', () => {
            it('should not remove the info in the storage', () => {
                var _key = 'k';
                var _info = 'x';
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toBe(_info);
                _x.remove(_key + 'something');
                expect(_x.get(_key)).toBe(_info);
            });
            it('should remove the info in the storage', () => {
                var _key = 'k';
                var _info = true;
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toBe(_info);
                _x.remove(_key);
                expect(_x.get(_key)).not.toBe(_info);
            });
            it('should remove the info in the storage - complex array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.remove(_key);
                expect(_x.get(_key)).not.toEqual(_info);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.remove(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.remove(_key);
                    expect(_x.get(_key)).not.toBe(_info);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.remove(_key);
                    expect(_x.get(_key)).not.toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                    _x.remove(_key + 'something', OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                });
                it('should remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                    _x.remove(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).not.toBe(_info);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.remove(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).not.toEqual(_info);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.remove(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                    _x.remove(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).not.toBe(_info);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.remove(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).not.toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                    _x.remove(_key + 'something', OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                });
                it('should remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                    _x.remove(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).not.toBe(_info);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.remove(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).not.toEqual(_info);
                });
            });
        });
    });
    describe('removeFirst', () => {
        describe('default', () => {
            it('should not remove the info in the storage - it\'s not an array', () => {
                var _key = 'k';
                var _info = 'x';
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toBe(_info);
                _x.removeFirst(_key + 'something');
                expect(_x.get(_key)).toBe(_info);
            });
            it('should remove the info from the storage - single info in array', () => {
                var _key = 'k';
                var _info = [true];
                var _expectedResult = [];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeFirst(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should remove the info in the storage - complex array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                var _expectedResult = [1];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeFirst(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should remove the info in the storage - multiple items in array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 3, true, false];
                var _expectedResult = [1, 3, true, false];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeFirst(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.removeFirst(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [1, 2, false, true];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [1];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method params', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                    _x.removeFirst(_key + 'something', OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [1, 2, false, true];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [1];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.removeFirst(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info from the storage - single item in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [1, 2, false, true];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [1];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeFirst(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method params', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                    _x.removeFirst(_key + 'something', OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [1, 2, false, true];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [1];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeFirst(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
    });
    describe('removeLast', () => {
        describe('default', () => {
            it('should not remove the info in the storage - it\'s not an array', () => {
                var _key = 'k';
                var _info = 'x';
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toBe(_info);
                _x.removeLast(_key + 'something');
                expect(_x.get(_key)).toBe(_info);
            });
            it('should remove the info from the storage - single info in array', () => {
                var _key = 'k';
                var _info = [true];
                var _expectedResult = [];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeLast(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should remove the info in the storage - complex array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeLast(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should remove the info in the storage - multiple items in array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 3, true, false];
                var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 3, true];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
                _x.removeLast(_key);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.removeLast(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method params', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                    _x.removeLast(_key + 'something', OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toBe(_info);
                    _x.removeLast(_key + 'something');
                    expect(_x.get(_key)).toBe(_info);
                });
                it('should remove the info from the storage - single item in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                    _x.removeLast(_key);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method params', () => {
                it('should not remove the info in the storage', () => {
                    var _key = 'k';
                    var _info = 'x';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                    _x.removeLast(_key + 'something', OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBe(_info);
                });
                it('should remove the info from the storage - single info in array', () => {
                    var _key = 'k';
                    var _info = [true];
                    var _expectedResult = [];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - multiple items in array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false, true];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1, 2, false];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should remove the info in the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }, 1];
                    var _expectedResult = [{ a: true, b: { c: [1, 2, 3, { d: true, e: false }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    _x.removeLast(_key, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
    });
    describe('removeAll', () => {
        describe('default', () => {
            it('should remove all the info from the storage', () => {
                var _key0 = 'k0';
                var _key1 = 'k1';
                var _info0 = 'i0';
                var _info1 = 'i1';
                var _x = new Xtorage();
                _x.save(_key0, _info0);
                _x.save(_key1, _info1);
                expect(_x.get(_key0)).toEqual(_info0);
                expect(_x.get(_key1)).toEqual(_info1);
                _x.removeAll();
                expect(_x.get(_key0)).not.toEqual(_info0);
                expect(_x.get(_key1)).not.toEqual(_info1);
            });
            it('should remove all the info from the storage - complex', () => {
                var _key0 = 'k0';
                var _key1 = 'k1';
                var _info0 = [{ a: 1, b: true, c: { d: 1, e: [{ f: false }] } }];
                var _info1 = [{ a: 1, b: true, c: { d: 1, e: [{ f: true }] } }];
                var _x = new Xtorage();
                _x.save(_key0, _info0);
                _x.save(_key1, _info1);
                expect(_x.get(_key0)).toEqual(_info0);
                expect(_x.get(_key1)).toEqual(_info1);
                _x.removeAll();
                expect(_x.get(_key0)).not.toEqual(_info0);
                expect(_x.get(_key1)).not.toEqual(_info1);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should remove all the info from the storage', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = 'i0';
                    var _info1 = 'i1';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key0, _info0);
                    _x.save(_key1, _info1);
                    expect(_x.get(_key0)).toEqual(_info0);
                    expect(_x.get(_key1)).toEqual(_info1);
                    _x.removeAll();
                    expect(_x.get(_key0)).not.toEqual(_info0);
                    expect(_x.get(_key1)).not.toEqual(_info1);
                });
                it('should remove all the info from the storage - complex', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = [{ a: 1, b: true, c: { d: 1, e: [{ f: false }] } }];
                    var _info1 = [{ a: 1, b: true, c: { d: 1, e: [{ f: true }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key0, _info0);
                    _x.save(_key1, _info1);
                    expect(_x.get(_key0)).toEqual(_info0);
                    expect(_x.get(_key1)).toEqual(_info1);
                    _x.removeAll();
                    expect(_x.get(_key0)).not.toEqual(_info0);
                    expect(_x.get(_key1)).not.toEqual(_info1);
                });
            });
            describe('method param', () => {
                it('should remove all the info from the storage', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = 'i0';
                    var _info1 = 'i1';
                    var _x = new Xtorage();
                    _x.save(_key0, _info0, OBJECT_LOCAL_STORAGE);
                    _x.save(_key1, _info1, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key0, OBJECT_LOCAL_STORAGE)).toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_LOCAL_STORAGE)).toEqual(_info1);
                    _x.removeAll(OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key0, OBJECT_LOCAL_STORAGE)).not.toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_LOCAL_STORAGE)).not.toEqual(_info1);
                });
                it('should remove all the info from the storage - complex', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = [{ a: 1, b: true, c: { d: 1, e: [{ f: false }] } }];
                    var _info1 = [{ a: 1, b: true, c: { d: 1, e: [{ f: true }] } }];
                    var _x = new Xtorage();
                    _x.save(_key0, _info0, OBJECT_LOCAL_STORAGE);
                    _x.save(_key1, _info1, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key0, OBJECT_LOCAL_STORAGE)).toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_LOCAL_STORAGE)).toEqual(_info1);
                    _x.removeAll(OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key0, OBJECT_LOCAL_STORAGE)).not.toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_LOCAL_STORAGE)).not.toEqual(_info1);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should remove all the info from the storage', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = 'i0';
                    var _info1 = 'i1';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key0, _info0);
                    _x.save(_key1, _info1);
                    expect(_x.get(_key0)).toEqual(_info0);
                    expect(_x.get(_key1)).toEqual(_info1);
                    _x.removeAll();
                    expect(_x.get(_key0)).not.toEqual(_info0);
                    expect(_x.get(_key1)).not.toEqual(_info1);
                });
                it('should remove all the info from the storage - complex', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = [{ a: 1, b: true, c: { d: 1, e: [{ f: false }] } }];
                    var _info1 = [{ a: 1, b: true, c: { d: 1, e: [{ f: true }] } }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key0, _info0);
                    _x.save(_key1, _info1);
                    expect(_x.get(_key0)).toEqual(_info0);
                    expect(_x.get(_key1)).toEqual(_info1);
                    _x.removeAll();
                    expect(_x.get(_key0)).not.toEqual(_info0);
                    expect(_x.get(_key1)).not.toEqual(_info1);
                });
            });
            describe('method param', () => {
                it('should remove all the info from the storage', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = 'i0';
                    var _info1 = 'i1';
                    var _x = new Xtorage();
                    _x.save(_key0, _info0, OBJECT_SESSION_STORAGE);
                    _x.save(_key1, _info1, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key0, OBJECT_SESSION_STORAGE)).toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_SESSION_STORAGE)).toEqual(_info1);
                    _x.removeAll(OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key0, OBJECT_SESSION_STORAGE)).not.toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_SESSION_STORAGE)).not.toEqual(_info1);
                });
                it('should remove all the info from the storage - complex', () => {
                    var _key0 = 'k0';
                    var _key1 = 'k1';
                    var _info0 = [{ a: 1, b: true, c: { d: 1, e: [{ f: false }] } }];
                    var _info1 = [{ a: 1, b: true, c: { d: 1, e: [{ f: true }] } }];
                    var _x = new Xtorage();
                    _x.save(_key0, _info0, OBJECT_SESSION_STORAGE);
                    _x.save(_key1, _info1, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key0, OBJECT_SESSION_STORAGE)).toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_SESSION_STORAGE)).toEqual(_info1);
                    _x.removeAll(OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key0, OBJECT_SESSION_STORAGE)).not.toEqual(_info0);
                    expect(_x.get(_key1, OBJECT_SESSION_STORAGE)).not.toEqual(_info1);
                });
            });
        });
    });
    describe('save', () => {
        describe('default', () => {
            it('should save to the storage - string', () => {
                var _key = 'k';
                var _info = 'a';
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should save to the storage - number', () => {
                var _key = 'k';
                var _info = 1;
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should save to the storage - boolean', () => {
                var _key = 'k';
                var _info = true;
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should save to the storage - complex object', () => {
                var _key = 'k';
                var _info = { a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } };
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
            it('should save to the storage - complex array', () => {
                var _key = 'k';
                var _info = [{ a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } }];
                var _x = new Xtorage();
                _x.save(_key, _info);
                expect(_x.get(_key)).toEqual(_info);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should save to the storage - string', () => {
                    var _key = 'k';
                    var _info = 'a';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - number', () => {
                    var _key = 'k';
                    var _info = 1;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - boolean', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - complex object', () => {
                    var _key = 'k';
                    var _info = { a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } };
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should save to the storage - string', () => {
                    var _key = 'k';
                    var _info = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should save to the storage - number', () => {
                    var _key = 'k';
                    var _info = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should save to the storage - boolean', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should save to the storage - complex object', () => {
                    var _key = 'k';
                    var _info = { a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } };
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
                it('should save to the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toBeNull();
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should save to the storage - string', () => {
                    var _key = 'k';
                    var _info = 'a';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - number', () => {
                    var _key = 'k';
                    var _info = 1;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - boolean', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - complex object', () => {
                    var _key = 'k';
                    var _info = { a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } };
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
                it('should save to the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _info);
                    expect(_x.get(_key)).toEqual(_info);
                });
            });
            describe('method param', () => {
                it('should save to the storage - string', () => {
                    var _key = 'k';
                    var _info = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should save to the storage - number', () => {
                    var _key = 'k';
                    var _info = 1;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should save to the storage - boolean', () => {
                    var _key = 'k';
                    var _info = true;
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should save to the storage - complex object', () => {
                    var _key = 'k';
                    var _info = { a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } };
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
                it('should save to the storage - complex array', () => {
                    var _key = 'k';
                    var _info = [{ a: true, b: { c: false, d: [1, { e: { f: [123.3] } }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _info, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_info);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toBeNull();
                });
            });
        });
    });
    describe('saveInLastPosition', () => {
        describe('default', () => {
            it('should not save, info in the storage is not array', () => {
                var _key = 'k';
                var _infoInStorage = 'a';
                var _newInfo = 'b';
                var _expectedResult = 'a';
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInLastPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - empty array', () => {
                var _key = 'k';
                var _infoInStorage = [];
                var _newInfo = 0;
                var _expectedResult = [_newInfo];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInLastPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - simple array', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2];
                var _newInfo = 0;
                var _expectedResult = [1, 2, _newInfo];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInLastPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - complex array in the storage', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _newInfo = 0;
                var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInLastPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - complex array in the storage and complex array being added', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInLastPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, _newInfo];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, _newInfo];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }, _newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInLastPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('unique option - saveInLastPosition', () => {
            describe('default', () => {
                it('should allow the storage to have repeated items in the array', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInLastPosition(_key, _info1);
                    _x.saveInLastPosition(_key, _info2);
                    _x.saveInLastPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(3);
                });
            });
            describe('constructor', () => {
                it('should not allow the storage to have repeated items - unique is false', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _arrayInStorage = [];
                    var _key = 'k';
                    var _x = new Xtorage(undefined, false);
                    _x.saveInLastPosition(_key, _info1);
                    _x.saveInLastPosition(_key, _info2);
                    _x.saveInLastPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(3);
                });
                it('should not allow the storage to have repeated items - unique is true', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage(undefined, true);
                    _x.saveInLastPosition(_key, _info1);
                    _x.saveInLastPosition(_key, _info2);
                    _x.saveInLastPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(1);
                });
            });
            describe('method param', () => {
                it('should not allow the storage to have repeated items - unique is false', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInLastPosition(_key, _info1, { unique: false });
                    _x.saveInLastPosition(_key, _info2, { unique: false });
                    _x.saveInLastPosition(_key, _info3, { unique: false });
                    expect(_x.get(_key).length).toBe(3);
                });
                it('should not allow the storage to have repeated items - unique is true', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInLastPosition(_key, _info1, { unique: true });
                    _x.saveInLastPosition(_key, _info2, { unique: true });
                    _x.saveInLastPosition(_key, _info3, { unique: true });
                    expect(_x.get(_key).length).toBe(1);
                });
            });
        });
    });
    describe('saveInFirstPosition', () => {
        describe('default', () => {
            it('should not save, info in the storage is not array', () => {
                var _key = 'k';
                var _infoInStorage = 'a';
                var _newInfo = 'b';
                var _expectedResult = 'a';
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInFirstPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - empty array', () => {
                var _key = 'k';
                var _infoInStorage = [];
                var _newInfo = 0;
                var _expectedResult = [_newInfo];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInFirstPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - simple array', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2];
                var _newInfo = 0;
                var _expectedResult = [_newInfo, 1, 2];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInFirstPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - complex array in the storage', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _newInfo = 0;
                var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInFirstPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
            it('should save correctly - complex array in the storage and complex array being added', () => {
                var _key = 'k';
                var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                var _x = new Xtorage();
                _x.save(_key, _infoInStorage);
                expect(_x.get(_key)).toEqual(_infoInStorage);
                _x.saveInFirstPosition(_key, _newInfo);
                expect(_x.get(_key)).toEqual(_expectedResult);
            });
        });
        describe('localStorage', () => {
            describe('constructor', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage(LOCAL_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('constructor', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_LOCAL_STORAGE);
                    expect(_x.get(_key, OBJECT_LOCAL_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('sessionStorage', () => {
            describe('constructor', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage(SESSION_STORAGE);
                    _x.save(_key, _infoInStorage);
                    expect(_x.get(_key)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo);
                    expect(_x.get(_key)).toEqual(_expectedResult);
                });
            });
            describe('method param', () => {
                it('should not save, info in the storage is not array', () => {
                    var _key = 'k';
                    var _infoInStorage = 'a';
                    var _newInfo = 'b';
                    var _expectedResult = 'a';
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - empty array', () => {
                    var _key = 'k';
                    var _infoInStorage = [];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - simple array', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = 0;
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
                it('should save correctly - complex array in the storage and complex array being added', () => {
                    var _key = 'k';
                    var _infoInStorage = [1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _newInfo = [{ a: 0.1, b: false, c: { d: [{ e: 'f', g: false, h: 1 }] } }];
                    var _expectedResult = [_newInfo, 1, 2, { a: true, b: { c: 1, d: [{ e: [1, { f: 'x' }] }] } }];
                    var _x = new Xtorage();
                    _x.save(_key, _infoInStorage, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_infoInStorage);
                    _x.saveInFirstPosition(_key, _newInfo, OBJECT_SESSION_STORAGE);
                    expect(_x.get(_key, OBJECT_SESSION_STORAGE)).toEqual(_expectedResult);
                });
            });
        });
        describe('unique option - saveInFirstPosition', () => {
            describe('default', () => {
                it('should allow the storage to have repeated items in the array', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInFirstPosition(_key, _info1);
                    _x.saveInFirstPosition(_key, _info2);
                    _x.saveInFirstPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(3);
                });
            });
            describe('constructor', () => {
                it('should not allow the storage to have repeated items - unique is false', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage(undefined, false);
                    _x.saveInFirstPosition(_key, _info1);
                    _x.saveInFirstPosition(_key, _info2);
                    _x.saveInFirstPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(3);
                });
                it('should not allow the storage to have repeated items - unique is true', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage(undefined, true);
                    _x.saveInFirstPosition(_key, _info1);
                    _x.saveInFirstPosition(_key, _info2);
                    _x.saveInFirstPosition(_key, _info3);
                    expect(_x.get(_key).length).toBe(1);
                });
            });
            describe('method param', () => {
                it('should not allow the storage to have repeated items - unique is false', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInFirstPosition(_key, _info1, { unique: false });
                    _x.saveInFirstPosition(_key, _info2, { unique: false });
                    _x.saveInFirstPosition(_key, _info3, { unique: false });
                    expect(_x.get(_key).length).toBe(3);
                });
                it('should not allow the storage to have repeated items - unique is true', () => {
                    var _info1 = { a: 1 };
                    var _info2 = { a: 1 };
                    var _info3 = { a: 1 };
                    var _info4 = { a: 1 };
                    var _info5 = { a: 1 };
                    var _key = 'k';
                    var _x = new Xtorage();
                    _x.saveInFirstPosition(_key, _info1, { unique: true });
                    _x.saveInFirstPosition(_key, _info2, { unique: true });
                    _x.saveInFirstPosition(_key, _info3, { unique: true });
                    _x.saveInFirstPosition(_key, _info4, { unique: true });
                    _x.saveInFirstPosition(_key, _info5, { unique: true });
                    expect(_x.get(_key).length).toBe(1);
                });
            });
        });
    });
    describe('push/unshift proxies', () => {
        describe('saveInFirstPosition', () => {
            it('should be able to push to the storage, even though there was nothing there', () => {
                var _key = 'k';
                var _info1 = 'a';
                var _info2 = 'b';
                var _x = new Xtorage();
                _x.saveInFirstPosition(_key, _info1);
                expect(_x.get(_key)[0]).toEqual(_info1);
                _x.saveInFirstPosition(_key, _info2);
                expect(_x.get(_key)[0]).toEqual(_info2);
                expect(_x.get(_key)[1]).toEqual(_info1);
            });
            it('unique - should be able to push to the storage, even though there was nothing there', () => {
                var _key = 'k';
                var _info1 = 'a';
                var _info2 = 'b';
                var _info3 = 'c';
                var _x = new Xtorage(undefined, true);
                _x.saveInFirstPosition(_key, _info1);
                expect(_x.get(_key)[0]).toEqual(_info1);
                _x.saveInFirstPosition(_key, _info2);
                expect(_x.get(_key)[0]).toEqual(_info2);
                expect(_x.get(_key)[1]).toEqual(_info1);
                _x.saveInFirstPosition(_key, _info3);
                expect(_x.get(_key)[0]).toEqual(_info3);
                expect(_x.get(_key)[1]).toEqual(_info2);
                expect(_x.get(_key)[2]).toEqual(_info1);
            });
        });
        describe('saveInLastPosition', () => {
            it('should be able to push to the storage, even though there was nothing there', () => {
                var _key = 'k';
                var _info1 = 'a';
                var _info2 = 'b';
                var _x = new Xtorage();
                _x.saveInLastPosition(_key, _info1);
                expect(_x.get(_key)[0]).toEqual(_info1);
                _x.saveInLastPosition(_key, _info2);
                expect(_x.get(_key)[0]).toEqual(_info1);
                expect(_x.get(_key)[1]).toEqual(_info2);
            });
            it('unique - should be able to push to the storage, even though there was nothing there', () => {
                var _key = 'k';
                var _info1 = 'a';
                var _info2 = 'b';
                var _info3 = 'c';
                var _x = new Xtorage(undefined, true);
                _x.saveInLastPosition(_key, _info1);
                expect(_x.get(_key)[0]).toEqual(_info1);
                _x.saveInLastPosition(_key, _info2);
                expect(_x.get(_key)[0]).toEqual(_info1);
                expect(_x.get(_key)[1]).toEqual(_info2);
                _x.saveInLastPosition(_key, _info3);
                expect(_x.get(_key)[0]).toEqual(_info1);
                expect(_x.get(_key)[1]).toEqual(_info2);
                expect(_x.get(_key)[2]).toEqual(_info3);
            });
        });
    });
});
