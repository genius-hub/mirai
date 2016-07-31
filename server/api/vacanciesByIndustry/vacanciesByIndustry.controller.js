/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vacanciesByIndustrys              ->  index
 * POST    /api/vacanciesByIndustrys              ->  create
 * GET     /api/vacanciesByIndustrys/:id          ->  show
 * PUT     /api/vacanciesByIndustrys/:id          ->  upsert
 * PATCH   /api/vacanciesByIndustrys/:id          ->  patch
 * DELETE  /api/vacanciesByIndustrys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {VacanciesByIndustry} from '../../sqldb';

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

// Gets a list of VacanciesByIndustrys
export function index(req, res) {
  return VacanciesByIndustry.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single VacanciesByIndustry from the DB
export function show(req, res) {
  return VacanciesByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new VacanciesByIndustry in the DB
export function create(req, res) {
  return VacanciesByIndustry.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given VacanciesByIndustry in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return VacanciesByIndustry.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing VacanciesByIndustry in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return VacanciesByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a VacanciesByIndustry from the DB
export function destroy(req, res) {
  return VacanciesByIndustry.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
