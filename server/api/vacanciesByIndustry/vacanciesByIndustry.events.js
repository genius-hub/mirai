/**
 * VacanciesByIndustry model events
 */

'use strict';

import {EventEmitter} from 'events';
var VacanciesByIndustry = require('../../sqldb').VacanciesByIndustry;
var VacanciesByIndustryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VacanciesByIndustryEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  VacanciesByIndustry.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    VacanciesByIndustryEvents.emit(event + ':' + doc._id, doc);
    VacanciesByIndustryEvents.emit(event, doc);
    done(null);
  };
}

export default VacanciesByIndustryEvents;
