/**
 * AverageIncomeByAge model events
 */

'use strict';

import {EventEmitter} from 'events';
var AverageIncomeByAge = require('../../sqldb').AverageIncomeByAge;
var AverageIncomeByAgeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AverageIncomeByAgeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  AverageIncomeByAge.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AverageIncomeByAgeEvents.emit(event + ':' + doc._id, doc);
    AverageIncomeByAgeEvents.emit(event, doc);
    done(null);
  };
}

export default AverageIncomeByAgeEvents;
