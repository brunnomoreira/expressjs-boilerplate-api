const events = require('events');
const types = require('./types');
const listeners = require('./listeners');

const emitter = new events.EventEmitter();

Object.keys(listeners).forEach(key => {
  emitter.on(listeners[key].event, listeners[key].handler);
});

module.exports = {
  emitter,
  types
};