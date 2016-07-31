/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/singlesByAges              ->  index
 * POST    /api/singlesByAges              ->  create
 * GET     /api/singlesByAges/:id          ->  show
 * PUT     /api/singlesByAges/:id          ->  upsert
 * PATCH   /api/singlesByAges/:id          ->  patch
 * DELETE  /api/singlesByAges/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {SinglesByAge} from '../../sqldb';

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

// Gets a list of SinglesByAges
export function index(req, res) {
  return SinglesByAge.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SinglesByAge from the DB
export function show(req, res) {
  return SinglesByAge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SinglesByAge in the DB
export function create(req, res) {
  return SinglesByAge.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given SinglesByAge in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return SinglesByAge.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing SinglesByAge in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return SinglesByAge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SinglesByAge from the DB
export function destroy(req, res) {
  return SinglesByAge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
