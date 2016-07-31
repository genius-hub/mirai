'use strict';

var app = require('../..');
import request from 'supertest';

var newEmploymentByIndustry;

describe('EmploymentByIndustry API:', function() {
  describe('GET /api/employmentByIndustrys', function() {
    var employmentByIndustrys;

    beforeEach(function(done) {
      request(app)
        .get('/api/employmentByIndustrys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          employmentByIndustrys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(employmentByIndustrys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/employmentByIndustrys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/employmentByIndustrys')
        .send({
          name: 'New EmploymentByIndustry',
          info: 'This is the brand new employmentByIndustry!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEmploymentByIndustry = res.body;
          done();
        });
    });

    it('should respond with the newly created employmentByIndustry', function() {
      expect(newEmploymentByIndustry.name).to.equal('New EmploymentByIndustry');
      expect(newEmploymentByIndustry.info).to.equal('This is the brand new employmentByIndustry!!!');
    });
  });

  describe('GET /api/employmentByIndustrys/:id', function() {
    var employmentByIndustry;

    beforeEach(function(done) {
      request(app)
        .get(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          employmentByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      employmentByIndustry = {};
    });

    it('should respond with the requested employmentByIndustry', function() {
      expect(employmentByIndustry.name).to.equal('New EmploymentByIndustry');
      expect(employmentByIndustry.info).to.equal('This is the brand new employmentByIndustry!!!');
    });
  });

  describe('PUT /api/employmentByIndustrys/:id', function() {
    var updatedEmploymentByIndustry;

    beforeEach(function(done) {
      request(app)
        .put(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
        .send({
          name: 'Updated EmploymentByIndustry',
          info: 'This is the updated employmentByIndustry!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEmploymentByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEmploymentByIndustry = {};
    });

    it('should respond with the original employmentByIndustry', function() {
      expect(updatedEmploymentByIndustry.name).to.equal('New EmploymentByIndustry');
      expect(updatedEmploymentByIndustry.info).to.equal('This is the brand new employmentByIndustry!!!');
    });

    it('should respond with the updated employmentByIndustry on a subsequent GET', function(done) {
      request(app)
        .get(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let employmentByIndustry = res.body;

          expect(employmentByIndustry.name).to.equal('Updated EmploymentByIndustry');
          expect(employmentByIndustry.info).to.equal('This is the updated employmentByIndustry!!!');

          done();
        });
    });
  });

  describe('PATCH /api/employmentByIndustrys/:id', function() {
    var patchedEmploymentByIndustry;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched EmploymentByIndustry' },
          { op: 'replace', path: '/info', value: 'This is the patched employmentByIndustry!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEmploymentByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEmploymentByIndustry = {};
    });

    it('should respond with the patched employmentByIndustry', function() {
      expect(patchedEmploymentByIndustry.name).to.equal('Patched EmploymentByIndustry');
      expect(patchedEmploymentByIndustry.info).to.equal('This is the patched employmentByIndustry!!!');
    });
  });

  describe('DELETE /api/employmentByIndustrys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when employmentByIndustry does not exist', function(done) {
      request(app)
        .delete(`/api/employmentByIndustrys/${newEmploymentByIndustry._id}`)
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
