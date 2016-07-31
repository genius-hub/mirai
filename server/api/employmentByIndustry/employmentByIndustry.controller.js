/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/employmentByIndustrys              ->  index
 * POST    /api/employmentByIndustrys              ->  create
 * GET     /api/employmentByIndustrys/:id          ->  show
 * PUT     /api/employmentByIndustrys/:id          ->  upsert
 * PATCH   /api/employmentByIndustrys/:id          ->  patch
 * DELETE  /api/employmentByIndustrys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {EmploymentByIndustry} from '../../sqldb';

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

// Gets a list of EmploymentByIndustrys
export function index(req, res) {
  return EmploymentByIndustry.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EmploymentByIndustry from the DB
export function show(req, res) {
  return EmploymentByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new EmploymentByIndustry in the DB
export function create(req, res) {
  return EmploymentByIndustry.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given EmploymentByIndustry in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return EmploymentByIndustry.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing EmploymentByIndustry in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return EmploymentByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a EmploymentByIndustry from the DB
export function destroy(req, res) {
  return EmploymentByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
