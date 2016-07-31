/**
 * IncomeByAgeATO model events
 */

'use strict';

import {EventEmitter} from 'events';
var IncomeByAgeATO = require('../../sqldb').IncomeByAgeATO;
var IncomeByAgeATOEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IncomeByAgeATOEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  IncomeByAgeATO.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    IncomeByAgeATOEvents.emit(event + ':' + doc._id, doc);
    IncomeByAgeATOEvents.emit(event, doc);
    done(null);
  };
}

export default IncomeByAgeATOEvents;
