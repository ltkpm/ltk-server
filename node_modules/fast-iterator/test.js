'use strict'

const t = require('tap')
const test = t.test
const Fast = require('./index')

test('Basic', t => {
  t.plan(10)

  const v1 = { hello: 'world' }
  const v2 = { ciao: 'mondo' }
  const v3 = { winter: 'is coming' }
  const v4 = { winter: 'has come' }
  const context = { context: true }

  const fast = Fast([fn1, fn2, fn3], context)
  t.is(typeof fast, 'function')
  fast(iterator.bind({ a: 'a', b: 'b' }), v1, done)

  function iterator (fn, value, next) {
    return fn(this.a, this.b, value, next)
  }

  function fn1 (a, b, value, done) {
    t.deepEqual(value, v1)
    t.deepEqual(this, context)
    done(null, v2)
  }

  function fn2 (a, b, value, done) {
    t.deepEqual(value, v2)
    t.deepEqual(this, context)
    done(null, v3)
  }

  function fn3 (a, b, value, done) {
    t.deepEqual(value, v3)
    t.deepEqual(this, context)
    done(null, v4)
  }

  function done (err, value) {
    t.error(err)
    t.deepEqual(this, context)
    t.deepEqual(value, v4)
  }
})

test('In case of error should skip to done', t => {
  t.plan(8)

  const v1 = { hello: 'world' }
  const v2 = { ciao: 'mondo' }
  const context = { context: true }

  const fast = Fast([fn1, fn2, fn3], context)
  t.is(typeof fast, 'function')
  fast(iterator.bind({ a: 'a', b: 'b' }), v1, done)

  function iterator (fn, value, next) {
    return fn(this.a, this.b, value, next)
  }

  function fn1 (a, b, value, done) {
    t.deepEqual(value, v1)
    t.deepEqual(this, context)
    done(null, v2)
  }

  function fn2 (a, b, value, done) {
    t.deepEqual(value, v2)
    t.deepEqual(this, context)
    done(new Error('kaboom'))
  }

  function fn3 (a, b, value, done) {
    t.fail('We should not be here')
  }

  function done (err, value) {
    t.is(err.message, 'kaboom')
    t.deepEqual(this, context)
    t.deepEqual(value, v2)
  }
})

test('Clean next', t => {
  t.plan(10)

  const v1 = { hello: 'world' }
  const context = { context: true }

  const fast = Fast([fn1, fn2, fn3], context)
  t.is(typeof fast, 'function')
  fast(iterator.bind({ a: 'a', b: 'b' }), v1, done)

  function iterator (fn, value, next) {
    return fn(this.a, this.b, value, next)
  }

  function fn1 (a, b, value, done) {
    t.deepEqual(value, v1)
    t.deepEqual(this, context)
    done()
  }

  function fn2 (a, b, value, done) {
    t.deepEqual(value, v1)
    t.deepEqual(this, context)
    done()
  }

  function fn3 (a, b, value, done) {
    t.deepEqual(value, v1)
    t.deepEqual(this, context)
    done()
  }

  function done (err, value) {
    t.error(err)
    t.deepEqual(this, context)
    t.deepEqual(value, v1)
  }
})
