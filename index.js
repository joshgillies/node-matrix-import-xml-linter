var EventEmitter = require('events').EventEmitter
var parseString = require('xml2js').parseString

module.exports = function linter (source) {
  var emitter = new EventEmitter()

  parseString(source, function (err, result) {
    if (err) {
      emitter.emit('error', err)
    }

    if (result && result.actions) {
      result.actions.action.forEach(function (action) {
        if (action.action_type[0] === 'create_asset') {
          if (action.parentid && action.parentid[0] === '1') {
            console.log('lol')
            emitter.emit('notice', 'Top most root node (#1) in use.')
          }
        }
      })
    }

    emitter.emit('end')
  })

  return emitter
}
