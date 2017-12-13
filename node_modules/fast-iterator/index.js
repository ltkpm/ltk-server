'use strict'

const reusify = require('reusify')

function fast (functions, context) {
  const holder = reusify(Holder)
  functions = functions.map(fn => fn.bind(context))

  return function _fast (iterator, value, done) {
    var instance = holder.get()
    instance.iterator = iterator
    instance.functions = functions
    instance.context = context
    instance.done = done
    instance.i = 0
    instance.value = value
    instance._next()
  }

  function Holder () {
    this.next = null
    this.value = null
    this.functions = null
    this.context = null
    this.done = null
    this.iterator = null
    this.i = 0

    var that = this

    this._next = function () {
      var fn = that.functions[that.i++]
      if (!fn) {
        that.done.call(that.context, null, that.value)
        holder.release(that)
        return
      }
      var res = that.iterator(fn, that.value, that._done)
      if (res && typeof res.then === 'function') {
        res.then(that._resolve)
           .catch(that._reject)
      }
    }

    this._done = function (err, value) {
      if (err) {
        that.done.call(that.context, err, that.value)
        holder.release(that)
        return
      }
      if (value !== undefined) that.value = value
      that._next()
    }

    this._resolve = function (value) {
      if (value !== undefined) that.value = value
      that._next()
    }

    this._reject = function (err) {
      that.done.call(that.context, err, that.value)
      holder.release(that)
    }
  }
}

module.exports = fast
