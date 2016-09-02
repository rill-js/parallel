'use strict'

/**
 * @api public
 * @description
 * Run all provided Rill middleware functions in parallel.
 *
 * @param {String|RegExp} from
 * @param {String} to
 * @return {Function}
 */
module.exports = function (fns) {
  if (!Array.isArray(fns)) {
    throw new TypeError('@rill/parallel: Middleware must be an array.')
  }

  if (!fns.every(isFn)) {
    throw new TypeError('@rill/parallel: Middleware must be functions.')
  }

  return function parallel (ctx, next) {
    var len = fns.length
    var promises = new Array(len)
    next = once(next)

    for (var i = 0; i < len; i++) {
      promises[i] = fns[i](ctx, next)
    }

    return Promise.all(promises)
  }
}

/**
 * @api private
 * @description
 * Test if a value is a function.
 *
 * @param {*} fn
 */
function isFn (fn) {
  return typeof fn === 'function'
}

/**
 * @api private
 * @description
 * Call a function once.
 *
 * @param {Function} fn
 */
function once (fn) {
  var value
  var called
  return function self () {
    if (called) return value
    called = true
    value = fn()
    return value
  }
}
