'use strict';

var app = require('../..');
import request from 'supertest';

var newIncomeByAgeATO;

describe('IncomeByAgeATO API:', function() {
  describe('GET /api/incomeByAgeATOs', function() {
    var incomeByAgeATOs;

    beforeEach(function(done) {
      request(app)
        .get('/api/incomeByAgeATOs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          incomeByAgeATOs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(incomeByAgeATOs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/incomeByAgeATOs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/incomeByAgeATOs')
        .send({
          name: 'New IncomeByAgeATO',
          info: 'This is the brand new incomeByAgeATO!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newIncomeByAgeATO = res.body;
          done();
        });
    });

    it('should respond with the newly created incomeByAgeATO', function() {
      expect(newIncomeByAgeATO.name).to.equal('New IncomeByAgeATO');
      expect(newIncomeByAgeATO.info).to.equal('This is the brand new incomeByAgeATO!!!');
    });
  });

  describe('GET /api/incomeByAgeATOs/:id', function() {
    var incomeByAgeATO;

    beforeEach(function(done) {
      request(app)
        .get(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          incomeByAgeATO = res.body;
          done();
        });
    });

    afterEach(function() {
      incomeByAgeATO = {};
    });

    it('should respond with the requested incomeByAgeATO', function() {
      expect(incomeByAgeATO.name).to.equal('New IncomeByAgeATO');
      expect(incomeByAgeATO.info).to.equal('This is the brand new incomeByAgeATO!!!');
    });
  });

  describe('PUT /api/incomeByAgeATOs/:id', function() {
    var updatedIncomeByAgeATO;

    beforeEach(function(done) {
      request(app)
        .put(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .send({
          name: 'Updated IncomeByAgeATO',
          info: 'This is the updated incomeByAgeATO!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedIncomeByAgeATO = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIncomeByAgeATO = {};
    });

    it('should respond with the original incomeByAgeATO', function() {
      expect(updatedIncomeByAgeATO.name).to.equal('New IncomeByAgeATO');
      expect(updatedIncomeByAgeATO.info).to.equal('This is the brand new incomeByAgeATO!!!');
    });

    it('should respond with the updated incomeByAgeATO on a subsequent GET', function(done) {
      request(app)
        .get(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let incomeByAgeATO = res.body;

          expect(incomeByAgeATO.name).to.equal('Updated IncomeByAgeATO');
          expect(incomeByAgeATO.info).to.equal('This is the updated incomeByAgeATO!!!');

          done();
        });
    });
  });

  describe('PATCH /api/incomeByAgeATOs/:id', function() {
    var patchedIncomeByAgeATO;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched IncomeByAgeATO' },
          { op: 'replace', path: '/info', value: 'This is the patched incomeByAgeATO!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedIncomeByAgeATO = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedIncomeByAgeATO = {};
    });

    it('should respond with the patched incomeByAgeATO', function() {
      expect(patchedIncomeByAgeATO.name).to.equal('Patched IncomeByAgeATO');
      expect(patchedIncomeByAgeATO.info).to.equal('This is the patched incomeByAgeATO!!!');
    });
  });

  describe('DELETE /api/incomeByAgeATOs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when incomeByAgeATO does not exist', function(done) {
      request(app)
        .delete(`/api/incomeByAgeATOs/${newIncomeByAgeATO._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
