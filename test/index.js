var Linter = require('../')
var test = require('tape')
var path = require('path')
var fs = require('fs')

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

test('emits notice', function (assert) {
  var linter = Linter()
  linter.on('notice', function (msg) {
    assert.ok(msg, 'notice event fired')
    assert.end()
  })
  linter.lint(fs.readFileSync(path.join(__dirname, 'fixtures/test1.xml')).toString())
})

test('emits end', function (assert) {
  var linter = Linter()
  linter.on('end', function () {
    assert.ok(true, 'end event fired')
    assert.end()
  })
  linter.lint('')
})
