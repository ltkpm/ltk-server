# fast-iterator

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/fast-iterator.svg?branch=init)](https://travis-ci.org/delvedor/fast-iterator)

Fast execution of an array of functions with the same value as input that can be altered.

<a name="install"></a>
## Install
```
npm i fast-iterator --save
```

<a name="usage"></a>
## Usage
```js
const fast = require('fast-iterator')

fast(
  [fn1, fn2, fn3], // the array of functions to execute
  { context: true } // a custom context for every function
)(
  iterator.bind({ a: 'a', b: 'b' }), // an iterator function to pass custom parameters
  { hello: 'world' }, // the value to update
  done // the function to call once the work has been done
)

function fn1 (a, b, result, done) {
  console.log(a, b, result, this)
  done(null, { ciao: 'mondo' })
}

function fn2 (a, b, result, done) {
  console.log(a, b, result, this)
  done(null, { winter: 'is coming' })
}

async function fn3 (a, b, result) {
  console.log(a, b, result, this)
  return { winter: 'has come' }
}

function iterator (fn, result, done) {
  return fn(this.a, this.b, result, done)
}

function done (err, result) {
  console.log(err || result, this)
}
```

<a name="acknowledgements"></a>
## Acknowledgements

This project is kindly sponsored by [LetzDoIt](http://www.letzdoitapp.com/).  

<a name="license"></a>
## License

Licensed under [MIT](./LICENSE).
