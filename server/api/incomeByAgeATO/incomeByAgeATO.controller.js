/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/incomeByAgeATOs              ->  index
 * POST    /api/incomeByAgeATOs              ->  create
 * GET     /api/incomeByAgeATOs/:id          ->  show
 * PUT     /api/incomeByAgeATOs/:id          ->  upsert
 * PATCH   /api/incomeByAgeATOs/:id          ->  patch
 * DELETE  /api/incomeByAgeATOs/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {IncomeByAgeATO} from '../../sqldb';

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

// Gets a list of IncomeByAgeATOs
export function index(req, res) {

  var sqlite3 = require('sqlite3');
  var dbs = new sqlite3.Database('dev2.sqlite');

  var getSa4 = "SELECT sa4Code FROM PostCodeSA4 WHERE postCode = " + req.query["postcode"];
  dbs.get(getSa4,function(err, row) {

    if(err){
      res.json({"Message":"An error occurred while accessing PostCodeSA4: " + serr.stack});
    } else {
      if(row !== undefined){
        var getAverageIncome = "SELECT totalIncome FROM ATOIncomeHelpDebt WHERE sa4Code = " + row.sa4Code +" AND minAge <= " + req.query["age"] + " AND maxAge >= " + req.query["age"];
        dbs.all(getAverageIncome,function(err, rows){

          if(err){
            res.json({"Message":"An error occurred while accessing ATOIncomeAverageIncome: " + err.stack})
          }else{
            if(typeof rows !== undefined && rows.length > 0){
              var averageIncome;
              var index;
              var row;
              var sumOfIncome = 0;
              var numResidents = rows.length;
              for(index in rows){
                row = rows[index];
                sumOfIncome += row.totalIncome;
              }
              averageIncome = sumOfIncome/numResidents;

              res.json({"Result": averageIncome});
            }else{
              res.json({"Message":"No data found for given SA4 Area"});
            }
          }
        });
      }else{
        res.json({"Message":"Invalid Postcode"});
      }
    }
  })
}

/*
  return IncomeByAgeATO.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
*/

// Gets a single IncomeByAgeATO from the DB
export function show(req, res) {
  return IncomeByAgeATO.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new IncomeByAgeATO in the DB
export function create(req, res) {
  return IncomeByAgeATO.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given IncomeByAgeATO in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return IncomeByAgeATO.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing IncomeByAgeATO in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return IncomeByAgeATO.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a IncomeByAgeATO from the DB
export function destroy(req, res) {
  return IncomeByAgeATO.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
