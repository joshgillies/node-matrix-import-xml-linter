var EventEmitter = require('events').EventEmitter
var parseString = require('xml2js').parseString
var inherits = require('inherits')

function Linter (opts) {
  if (!(this instanceof Linter)) {
    return new Linter(opts)
  }

  EventEmitter.call(this)
}

inherits(Linter, EventEmitter)

Linter.prototype.lint = function lint (source) {
  var self = this

  parseString(source, function (err, result) {
    if (err) {
      self.emit('error', err)
    }

    if (result && result.actions) {
      result.actions.action.forEach(function (action) {
        if (action.action_type[0] === 'create_asset') {
          if (action.parentid && action.parentid[0] === '1') {
            self.emit('notice', 'Top most root node (#1) in use.')
          }
        }
      })
    }

    self.emit('end')
  })
}

module.exports = Linter
