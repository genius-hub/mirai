/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/helpPerSa4s              ->  index
 * POST    /api/helpPerSa4s              ->  create
 * GET     /api/helpPerSa4s/:id          ->  show
 * PUT     /api/helpPerSa4s/:id          ->  upsert
 * PATCH   /api/helpPerSa4s/:id          ->  patch
 * DELETE  /api/helpPerSa4s/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {HelpPerSa4} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of HelpPerSa4s
export function index(req, res) {
  return HelpPerSa4.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single HelpPerSa4 from the DB
export function show(req, res) {
  return HelpPerSa4.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new HelpPerSa4 in the DB
export function create(req, res) {
  return HelpPerSa4.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given HelpPerSa4 in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return HelpPerSa4.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing HelpPerSa4 in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return HelpPerSa4.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a HelpPerSa4 from the DB
export function destroy(req, res) {
  return HelpPerSa4.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
