/**
 * SinglesByAge model events
 */

'use strict';

import {EventEmitter} from 'events';
var SinglesByAge = require('../../sqldb').SinglesByAge;
var SinglesByAgeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SinglesByAgeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  SinglesByAge.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SinglesByAgeEvents.emit(event + ':' + doc._id, doc);
    SinglesByAgeEvents.emit(event, doc);
    done(null);
  };
}

export default SinglesByAgeEvents;
