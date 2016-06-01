# xtorage

[![Build Status](https://travis-ci.org/ericmdantas/xtorage.svg?branch=master)](https://travis-ci.org/ericmdantas/xtorage)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/xtorage/badge.svg?branch=master)](https://coveralls.io/r/ericmdantas/xtorage?branch=master)
[![npm version](https://badge.fury.io/js/xtorage.svg)](https://badge.fury.io/js/xtorage)

# install

```

$ npm i --save xtorage

```

# what?

This is a tiny, yet powerful *framework-agnostic* wrapper for the web storage.

Focus on your business logic.

# why?

Because you shouldn't keep parsing strings/arrays/numbers/objects left and right to save/retrieve stuff into and from the storage.

Just call ```save()```, ```saveInFirstPosition()```, ```remove()```, ```removeLast()``` and so on.

# how?

This module will do all the parsing needed to save stuff in the storage and retrieve stuff from there.

# is there anything else?

Yeah! This module also extends the Web Storage API.

For example, if you have an array in the storage and you want to save something to its last position, just call:

```saveInLastPosition(key, info)``` and there you go. The array now will have the info in its last position.

# where can I use it?

Well, pretty much everywhere that is javascript in the front-end; So, it'll work for:
- Angular2;
- Aurelia;
- React;
- Electron;
- Backbone;
- Knockout;
- Ember;
- You name it!

> Note: If you're using Angular 1.x, you should use [ng-xtorage](https://github.com/ericmdantas/ng-xtorage) instead.

# alright, let's talk about the API

## constructor

### contract

```js
new Xtorage(storage: 'localStorage' | 'sessionStorage', unique: boolean)
```

### usage - storage

```js
  var _x = new Xtorage('localStorage');

  _x.save('k', 1); // saves 1, with the key 'k' in the localStorage
```

```js
  var _x = new Xtorage('sessionStorage');  

  _x.save('k', 1); // saves 1, with the key 'k' in the sessionStorage
```

```js
  var _x = new Xtorage();

  _x.save('k', 1); // saves 1, with the key 'k' in the localStorage - which is the default
```

### usage - unique

```js
  var _x = new Xtorage(undefined, true);

  _x.saveInFirstPosition('k', 1); // array length is 1  
  _x.saveInFirstPosition('k', 1); // array length is still 1, unique is set to true
```

```js
  var _x = new Xtorage(undefined, false);

  _x.saveInFirstPosition('k', 1); // array length is 1  
  _x.saveInFirstPosition('k', 1); // array length is 2, unique is set to false
```

```js
  var _x = new Xtorage();

  _x.saveInFirstPosition('k', 1); // array length is 1  
  _x.saveInFirstPosition('k', 1); // array length is 2, unique, by default, is false
```

## save

### contract

```js
save(key:string, info:any [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.save('k', {a: 1});

  console.log(_x.get('k')); // {a: 1}

```

## saveInFirstPosition

### contract

```js
  saveInFirstPosition(key:string, info:any [, options:{storage: 'localStorage' | 'sessionStorage', unique: boolean}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});

  console.log(_x.get('k')); // [{a: 1}]

  _x.saveInFirstPosition('k', {b: 2});

  console.log(_x.get('k')); // [{b: 2}, {a: 1}]
```

## saveInLastPosition

### contract

```js
saveInLastPosition(key:string, info:any [, options:{storage: localStorage | sessionStorage, unique: boolean}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.get('k')); // [{a: 1}]

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]
```

## get

### contract

```js
get(key:string [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.save('k', [1, true, {a: 1}, [{c: 'abc'}]);

  console.log(_x.get('k')); // [1, true, {a: 1}, [{c: 'abc'}]

```


## getFirst

### contract

```js
getFirst(key:string [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // {a: 1}
```

## getLast

### contract

```js
getLast(key:string [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // {b: 2}
```

## remove

### contract

```js
remove(key:string, [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.save('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.remove('k');

  console.log(_x.get('k')); // undefined
```

## removeAll

### contract

```js
removeAll([, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.save('k', {a: 1});
  _x.save('y', [{somethingElse: true}]);

  console.log(_x.get('k')); // {a: 1}
  console.log(_x.get('y')); // [{somethingElse: true}]

  _x.removeAll();

  console.log(_x.get('k')); // undefined
  console.log(_x.get('y')); // undefined
```

## removeFirst

### contract

```js
removeFirst(key:string, [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});
  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]

  _x.removeFirst('k');

  console.log(_x.get('k')); // [{b: 2}]
```

## removeLast

### contract

```js
removeLast(key:string, [, options:{storage: 'localStorage' | 'sessionStorage'}])
```

### usage

```js
  var _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});
  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]

  _x.removeLast('k');

  console.log(_x.get('k')); // [{a: 1}]
```
