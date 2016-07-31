'use strict';

var app = require('../..');
import request from 'supertest';

var newAverageIncomeByAge;

describe('AverageIncomeByAge API:', function() {
  describe('GET /api/averageIncomeByAges', function() {
    var averageIncomeByAges;

    beforeEach(function(done) {
      request(app)
        .get('/api/averageIncomeByAges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          averageIncomeByAges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(averageIncomeByAges).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/averageIncomeByAges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/averageIncomeByAges')
        .send({
          name: 'New AverageIncomeByAge',
          info: 'This is the brand new averageIncomeByAge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAverageIncomeByAge = res.body;
          done();
        });
    });

    it('should respond with the newly created averageIncomeByAge', function() {
      expect(newAverageIncomeByAge.name).to.equal('New AverageIncomeByAge');
      expect(newAverageIncomeByAge.info).to.equal('This is the brand new averageIncomeByAge!!!');
    });
  });

  describe('GET /api/averageIncomeByAges/:id', function() {
    var averageIncomeByAge;

    beforeEach(function(done) {
      request(app)
        .get(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          averageIncomeByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      averageIncomeByAge = {};
    });

    it('should respond with the requested averageIncomeByAge', function() {
      expect(averageIncomeByAge.name).to.equal('New AverageIncomeByAge');
      expect(averageIncomeByAge.info).to.equal('This is the brand new averageIncomeByAge!!!');
    });
  });

  describe('PUT /api/averageIncomeByAges/:id', function() {
    var updatedAverageIncomeByAge;

    beforeEach(function(done) {
      request(app)
        .put(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
        .send({
          name: 'Updated AverageIncomeByAge',
          info: 'This is the updated averageIncomeByAge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAverageIncomeByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAverageIncomeByAge = {};
    });

    it('should respond with the original averageIncomeByAge', function() {
      expect(updatedAverageIncomeByAge.name).to.equal('New AverageIncomeByAge');
      expect(updatedAverageIncomeByAge.info).to.equal('This is the brand new averageIncomeByAge!!!');
    });

    it('should respond with the updated averageIncomeByAge on a subsequent GET', function(done) {
      request(app)
        .get(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let averageIncomeByAge = res.body;

          expect(averageIncomeByAge.name).to.equal('Updated AverageIncomeByAge');
          expect(averageIncomeByAge.info).to.equal('This is the updated averageIncomeByAge!!!');

          done();
        });
    });
  });

  describe('PATCH /api/averageIncomeByAges/:id', function() {
    var patchedAverageIncomeByAge;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched AverageIncomeByAge' },
          { op: 'replace', path: '/info', value: 'This is the patched averageIncomeByAge!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAverageIncomeByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAverageIncomeByAge = {};
    });

    it('should respond with the patched averageIncomeByAge', function() {
      expect(patchedAverageIncomeByAge.name).to.equal('Patched AverageIncomeByAge');
      expect(patchedAverageIncomeByAge.info).to.equal('This is the patched averageIncomeByAge!!!');
    });
  });

  describe('DELETE /api/averageIncomeByAges/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when averageIncomeByAge does not exist', function(done) {
      request(app)
        .delete(`/api/averageIncomeByAges/${newAverageIncomeByAge._id}`)
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
