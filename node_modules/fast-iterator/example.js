'use strict'

const fast = require('./index')

fast(
  [fn1, fn2, fn3],
  { context: true }
)(
  iterator.bind({ a: 'a', b: 'b' }),
  { hello: 'world' },
  done
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
