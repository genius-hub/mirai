/**
 * EmploymentByIndustry model events
 */

'use strict';

import {EventEmitter} from 'events';
var EmploymentByIndustry = require('../../sqldb').EmploymentByIndustry;
var EmploymentByIndustryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmploymentByIndustryEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  EmploymentByIndustry.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EmploymentByIndustryEvents.emit(event + ':' + doc._id, doc);
    EmploymentByIndustryEvents.emit(event, doc);
    done(null);
  };
}

export default EmploymentByIndustryEvents;
