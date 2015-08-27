# xtorage

[![Build Status](https://travis-ci.org/ericmdantas/xtorage.svg?branch=master)](https://travis-ci.org/ericmdantas/xtorage)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/xtorage/badge.svg?branch=master)](https://coveralls.io/r/ericmdantas/xtorage?branch=master)

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
- Backbone;
- Knockout;
- Ember;
- You name it!

> Note: If you're using Angular 1.x, you should use [ng-xtorage](https://github.com/ericmdantas/ng-xtorage) instead.

# alright, let's talk about the API

> insert API here
