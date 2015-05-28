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

    describe('remove', function() {
        describe('default', function()
        {
            it('should not remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toBe(_info);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}];

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toEqual(_info);
            })
        })

        describe('localStorage', function()
        {
            it('should not remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toBe(_info);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}];

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toEqual(_info);
            })
        })

        describe('sessionStorage', function()
        {
            it('should not remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toBe(_info);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}];

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.remove(_key);

                expect(_x.get(_key)).not.toEqual(_info);
            })
        })
    })

    describe('removeFirst', function() {
        describe('default', function()
        {
            it('should not remove the info in the storage - it\'s not an array', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.removeFirst(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage - single info in array', function()
            {
                var _key = 'k';
                var _info = [true];
                var _expectedResult = [];

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1];
                var _expectedResult = [1];

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - multiple items in array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1, 3, true, false];
                var _expectedResult = [1, 3, true, false];

                var _x = new xtorage.Xtorage();
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })
        })

        describe('localStorage', function()
        {
            it('should not remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.removeFirst(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage - single info in array', function()
            {
                var _key = 'k';
                var _info = [true];
                var _expectedResult = [];

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - multiple items in array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1, 2, false, true];
                var _expectedResult = [1, 2, false, true];

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1];
                var _expectedResult = [1];

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })
        })

        describe('sessionStorage', function()
        {
            it('should not remove the info in the storage', function()
            {
                var _key = 'k';
                var _info = 'x';

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toBe(_info);

                _x.removeFirst(_key + 'something');

                expect(_x.get(_key)).toBe(_info);
            })

            it('should remove the info in the storage - single item in array', function()
            {
                var _key = 'k';
                var _info = [true];
                var _expectedResult = [];

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - multiple items in array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1, 2, false, true];
                var _expectedResult = [1, 2, false, true];

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })

            it('should remove the info in the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: [1, 2, 3, {d: true, e: false}]}}, 1];
                var _expectedResult = [1];

                var _x = new xtorage.Xtorage(SESSION_STORAGE);
                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);

                _x.removeFirst(_key);

                expect(_x.get(_key)).toEqual(_expectedResult);
            })
        })
    })

    describe('removeAll', function() {
        describe('default', function()
        {
            it('should remove all the info from the storage', function() {
                var _key0 = 'k0';
                var _key1 = 'k1';
                var _info0 = 'i0';
                var _info1 = 'i1';

                var _x = new xtorage.Xtorage();

                _x.save(_key0, _info0);
                _x.save(_key1, _info1);

                expect(_x.get(_key0)).toEqual(_info0);
                expect(_x.get(_key1)).toEqual(_info1);

                _x.removeAll();

                expect(_x.get(_key0)).not.toEqual(_info0);
                expect(_x.get(_key1)).not.toEqual(_info1);
            })

            it('should remove all the info from the storage - complex', function() {
                var _key0 = 'k0';
                var _key1 = 'k1';
                var _info0 = [{a: 1, b: true, c: {d: 1, e: [{f: false}]}}];
                var _info1 = [{a: 1, b: true, c: {d: 1, e: [{f: true}]}}];

                var _x = new xtorage.Xtorage();

                _x.save(_key0, _info0);
                _x.save(_key1, _info1);

                expect(_x.get(_key0)).toEqual(_info0);
                expect(_x.get(_key1)).toEqual(_info1);

                _x.removeAll();

                expect(_x.get(_key0)).not.toEqual(_info0);
                expect(_x.get(_key1)).not.toEqual(_info1);
            })
        })
    })

    describe('save', function()
    {
        describe('default', function()
        {
            it('should save to the storage - string', function()
            {
                var _key = 'k';
                var _info = 'a';

                var _x = new xtorage.Xtorage();

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - number', function()
            {
                var _key = 'k';
                var _info = 1;

                var _x = new xtorage.Xtorage();

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - boolean', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage();

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex object', function()
            {
                var _key = 'k';
                var _info = {a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}};

                var _x = new xtorage.Xtorage();

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}}];

                var _x = new xtorage.Xtorage();

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })

        describe('localStorage', function()
        {
            it('should save to the storage - string', function()
            {
                var _key = 'k';
                var _info = 'a';

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - number', function()
            {
                var _key = 'k';
                var _info = 1;

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - boolean', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex object', function()
            {
                var _key = 'k';
                var _info = {a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}};

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}}];

                var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })

        describe('sessionStorage', function()
        {
            it('should save to the storage - string', function()
            {
                var _key = 'k';
                var _info = 'a';

                var _x = new xtorage.Xtorage(SESSION_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - number', function()
            {
                var _key = 'k';
                var _info = 1;

                var _x = new xtorage.Xtorage(SESSION_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - boolean', function()
            {
                var _key = 'k';
                var _info = true;

                var _x = new xtorage.Xtorage(SESSION_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex object', function()
            {
                var _key = 'k';
                var _info = {a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}};

                var _x = new xtorage.Xtorage(SESSION_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })

            it('should save to the storage - complex array', function()
            {
                var _key = 'k';
                var _info = [{a: true, b: {c: false, d: [1, {e: {f: [123.3]}}]}}];

                var _x = new xtorage.Xtorage(SESSION_STORAGE);

                _x.save(_key, _info);

                expect(_x.get(_key)).toEqual(_info);
            })
        })
    })

    describe('saveInLastPosition', function() {
         describe('default', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, _newInfo];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })

         describe('localStorage', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, _newInfo];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })

         describe('sessionStorage', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, _newInfo];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}, _newInfo];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInLastPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })
    })

    describe('saveInFirstPosition', function() {
         describe('default', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage();

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })

         describe('localStorage', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage(LOCAL_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })

         describe('sessionStorage', function()
         {
             it('should not save, info in the storage is not array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = 'a';
                 var _newInfo = 'b';
                 var _expectedResult = 'a';

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - simple array', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = 0;
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })

             it('should save correctly - complex array in the storage and complex array being added', function()
             {
                 var _key = 'k';
                 var _infoInStorage = [1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];
                 var _newInfo = [{a: 0.1, b: false, c: {d: [{e: 'f', g: false, h: 1}]}}];
                 var _expectedResult = [_newInfo, 1, 2, {a: true, b: {c: 1, d: [{e:[1, {f: 'x'}]}]}}];

                 var _x = new xtorage.Xtorage(SESSION_STORAGE);

                 _x.save(_key, _infoInStorage);

                 expect(_x.get(_key)).toEqual(_infoInStorage);

                 _x.saveInFirstPosition(_key, _newInfo);

                 expect(_x.get(_key)).toEqual(_expectedResult);
             })
         })
    })
})