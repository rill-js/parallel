'use strict'

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var parallel = require('../')

describe('Rill/Parallel', function () {
  it('should run in parallel', function (done) {
    var started = null
    var request = agent(
      Rill()
        .use(function (ctx, next) {
          started = new Date()
          return next()
        })
        .use(parallel([
          function (ctx, next) {
            assert(hasElapsed(0))
            return sleep(100)
              .then(function () {
                assert(hasElapsed(100))
              })
              .then(next)
              .then(function () {
                // next was invoked immediatly by second middleware.
                assert(hasElapsed(100))
              })
          },
          function (ctx, next) {
            assert(hasElapsed(0))
            return next().then(function () {
              return sleep(100).then(function () {
                assert(hasElapsed(200))
              })
            })
          }
        ]))
        .use(function (ctx) {
          assert(hasElapsed(0))
          return sleep(100).then(function () {
            ctx.res.status = 200
          })
        })
        .listen()
    )

    request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert(hasElapsed(200))
      })
      .end(done)

    // Check if a certain duration has elapsed with 25ms tolerance.
    function hasElapsed (ms) {
      var diff = +new Date() - started
      return diff >= ms && diff < ms + 25
    }
  })
})

function sleep (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}
