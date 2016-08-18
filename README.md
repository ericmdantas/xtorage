# Xtorage

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

### API

#### constructor

```ts
new Xtorage(storage: 'localStorage' | 'sessionStorage', unique: boolean)
```

```js
  let _x1 = new Xtorage('localStorage');
  _x1.save('k', 1); // saves 1, with the key 'k' in the localStorage

  let _x2 = new Xtorage('sessionStorage');  
  _x2.save('k', 2); // saves 1, with the key 'k' in the sessionStorage

  let _x3 = new Xtorage();
  _x3.save('k', 3); // saves 1, with the key 'k' in the localStorage - which is the default


  let _x4 = new Xtorage(undefined, true);

  _x4.saveInFirstPosition('k', 1); // array length is 1  
  _x4.saveInFirstPosition('k', 1); // array length is still 1, unique is set to true

  let _x5 = new Xtorage(undefined, false);

  _x5.saveInFirstPosition('k', 1); // array length is 1  
  _x5.saveInFirstPosition('k', 1); // array length is 2, unique is set to false

  let _x6 = new Xtorage();

  _x6.saveInFirstPosition('k', 1); // array length is 1  
  _x6.saveInFirstPosition('k', 1); // array length is 2, unique, by default, is false
```

#### save

```ts
save(key:string, info:any):void
```

```js
  let _x = new Xtorage();

  _x.save('k', {a: 1});

  console.log(_x.get('k')); // {a: 1}

```

#### saveInFirstPosition

```ts
  saveInFirstPosition(key:string, info:any):void
```

```js
  let _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});

  console.log(_x.get('k')); // [{a: 1}]

  _x.saveInFirstPosition('k', {b: 2});

  console.log(_x.get('k')); // [{b: 2}, {a: 1}]
```

#### saveInLastPosition

```ts
saveInLastPosition(key:string, info:any):void
```

```js
  let _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.get('k')); // [{a: 1}]

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]
```

#### get

```ts
get(key:string):any
```

```js
  let _x = new Xtorage();

  _x.save('k', [1, true, {a: 1}, [{c: 'abc'}]);

  console.log(_x.get('k')); // [1, true, {a: 1}, [{c: 'abc'}]
```


#### getFirst

```ts
getFirst(key:string):void
```

```js
  let _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // {a: 1}
```

#### getLast

```ts
getLast(key:string):void
```

```js
  let _x = new Xtorage();

  _x.saveInLastPosition('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // {b: 2}
```

#### remove

```ts
remove(key:string):void
```

```js
  let _x = new Xtorage();

  _x.save('k', {a: 1});

  console.log(_x.getFirst('k')); // {a: 1}

  _x.remove('k');

  console.log(_x.get('k')); // undefined
```

#### removeAll

```ts
removeAll():void
```

```js
  let _x = new Xtorage();

  _x.save('k', {a: 1});
  _x.save('y', [{somethingElse: true}]);

  console.log(_x.get('k')); // {a: 1}
  console.log(_x.get('y')); // [{somethingElse: true}]

  _x.removeAll();

  console.log(_x.get('k')); // undefined
  console.log(_x.get('y')); // undefined
```

#### removeFirst

```ts
removeFirst(key:string):void
```

```js
  let _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});
  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]

  _x.removeFirst('k');

  console.log(_x.get('k')); // [{b: 2}]
```

#### removeLast

```ts
removeLast(key:string):void
```

```js
  let _x = new Xtorage();

  _x.saveInFirstPosition('k', {a: 1});
  _x.saveInLastPosition('k', {b: 2});

  console.log(_x.get('k')); // [{a: 1}, {b: 2}]

  _x.removeLast('k');

  console.log(_x.get('k')); // [{a: 1}]
```
