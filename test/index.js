var test = require('tape')
var Linter = require('../')

test('basic', function (assert) {
  assert.equals(typeof Linter, 'function', 'require returns function')
  assert.end()
})

test('passed errors up from xml2js', function (assert) {
  var linter = Linter()
  linter.on('error', function (err) {
    assert.ok(err, 'error event fired')
    assert.end()
  })
  linter.lint('<test')
})

test('emits end', function (assert) {
  var linter = Linter()
  linter.on('end', function () {
    assert.ok(true, 'end event fired')
    assert.end()
  })
  linter.lint('')
})
