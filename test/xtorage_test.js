"use strict";

describe('xtorage', function() {

    var LOCAL_STORAGE = 'localStorage';
    var SESSION_STORAGE = 'sessionStorage';

    beforeEach(function()
    {

    });

    afterEach(function() {
        window.localStorage.clear();
        window.sessionStorage.clear();
    })

    describe('_parseOptions', function()
    {
        it('should return the object with the storage as localStorage', function()
        {
            var _x = new xtorage.Xtorage();

            expect(_x._parseOptions()).toEqual({storage: 'localStorage'});
        })

        it('should return the object with the storage as sessionStorage', function()
        {
            var _x = new xtorage.Xtorage();

            expect(_x._parseOptions({storage: 'localStorage'})).toEqual({storage: 'localStorage'});
        })

        it('should return the object with the storage as sessionStorage', function()
        {
            var _x = new xtorage.Xtorage();

            expect(_x._parseOptions({storage: 'sessionStorage'})).toEqual({storage: 'sessionStorage'});
        })
    })

    describe('_toStringifiedJSON', function()
    {
        it('should return a string', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON("a")).toEqual("a");
        })

        it('should return a number', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON(1)).toEqual(1);
        })

        it('should return a boolean', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON(true)).toEqual(true);
        })

        it('should return a stringified object', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON({})).toEqual("{}");
        })

        it('should return a stringified object', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON({a: true})).toEqual('{"a":true}');
        })

        it('should return a stringified array', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._toStringifiedJSON([{a: true}])).toEqual('[{"a":true}]');
        })
    })

    describe('_fromStringifiedJSON', function()
    {
        it('should return the same string', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON('a')).toEqual('a');
        })

        it('should return the same number', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON(1)).toEqual(1);
        })

        it('should return the same boolean', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON(true)).toEqual(true);
        })

        it('should return an empty object', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON('{}')).toEqual({});
        })

        it('should return an empty array', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON('[]')).toEqual([]);
        })

        it('should return an empty with an empty object', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON('[{}]')).toEqual([{}]);
        })

        it('should return the array with the objects in it', function() {
            var _x = new xtorage.Xtorage();

            expect(_x._fromStringifiedJSON('[{"a":1, "b": true, "c": "d"}]')).toEqual([{a: 1, b: true, c: "d"}]);
        })
    })

    describe('get', function()
    {
        describe('default', function()
        {
            it('should return an empty string from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = '';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a simple string from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = 'a';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a number from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = 1;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a boolean', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = false;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an object from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = {};

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = [];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array with an object from the storage', function() {
                var _x = new xtorage.Xtorage();
                var _key = 'k';
                var _info = [{a: true}];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })

        describe('localStorage', function()
        {
            it('should return an empty string from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = '';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a simple string from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = 'a';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a number from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = 1;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a boolean', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = false;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an object from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = {};

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = [];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array with an object from the storage', function() {
                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                var _key = 'k';
                var _info = [{a: true}];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })

        describe('sessionStorage', function()
        {
            it('should return an empty string from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = '';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a simple string from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = 'a';

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a number from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = 1;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return a boolean', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = false;

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an object from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = {};

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = [];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should return an array with an object from the storage', function() {
                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                var _key = 'k';
                var _info = [{a: true}];

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })
    })

})