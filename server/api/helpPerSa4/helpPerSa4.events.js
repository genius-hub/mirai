/**
 * HelpPerSa4 model events
 */

'use strict';

import {EventEmitter} from 'events';
var HelpPerSa4 = require('../../sqldb').HelpPerSa4;
var HelpPerSa4Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
HelpPerSa4Events.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  HelpPerSa4.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    HelpPerSa4Events.emit(event + ':' + doc._id, doc);
    HelpPerSa4Events.emit(event, doc);
    done(null);
  };
}

export default HelpPerSa4Events;
