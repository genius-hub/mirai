'use strict';

var app = require('../..');
import request from 'supertest';

var newVacanciesByIndustry;

describe('VacanciesByIndustry API:', function() {
  describe('GET /api/vacanciesByIndustrys', function() {
    var vacanciesByIndustrys;

    beforeEach(function(done) {
      request(app)
        .get('/api/vacanciesByIndustrys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vacanciesByIndustrys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vacanciesByIndustrys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/vacanciesByIndustrys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vacanciesByIndustrys')
        .send({
          name: 'New VacanciesByIndustry',
          info: 'This is the brand new vacanciesByIndustry!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVacanciesByIndustry = res.body;
          done();
        });
    });

    it('should respond with the newly created vacanciesByIndustry', function() {
      expect(newVacanciesByIndustry.name).to.equal('New VacanciesByIndustry');
      expect(newVacanciesByIndustry.info).to.equal('This is the brand new vacanciesByIndustry!!!');
    });
  });

  describe('GET /api/vacanciesByIndustrys/:id', function() {
    var vacanciesByIndustry;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vacanciesByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      vacanciesByIndustry = {};
    });

    it('should respond with the requested vacanciesByIndustry', function() {
      expect(vacanciesByIndustry.name).to.equal('New VacanciesByIndustry');
      expect(vacanciesByIndustry.info).to.equal('This is the brand new vacanciesByIndustry!!!');
    });
  });

  describe('PUT /api/vacanciesByIndustrys/:id', function() {
    var updatedVacanciesByIndustry;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
        .send({
          name: 'Updated VacanciesByIndustry',
          info: 'This is the updated vacanciesByIndustry!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVacanciesByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVacanciesByIndustry = {};
    });

    it('should respond with the original vacanciesByIndustry', function() {
      expect(updatedVacanciesByIndustry.name).to.equal('New VacanciesByIndustry');
      expect(updatedVacanciesByIndustry.info).to.equal('This is the brand new vacanciesByIndustry!!!');
    });

    it('should respond with the updated vacanciesByIndustry on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vacanciesByIndustry = res.body;

          expect(vacanciesByIndustry.name).to.equal('Updated VacanciesByIndustry');
          expect(vacanciesByIndustry.info).to.equal('This is the updated vacanciesByIndustry!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vacanciesByIndustrys/:id', function() {
    var patchedVacanciesByIndustry;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched VacanciesByIndustry' },
          { op: 'replace', path: '/info', value: 'This is the patched vacanciesByIndustry!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVacanciesByIndustry = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVacanciesByIndustry = {};
    });

    it('should respond with the patched vacanciesByIndustry', function() {
      expect(patchedVacanciesByIndustry.name).to.equal('Patched VacanciesByIndustry');
      expect(patchedVacanciesByIndustry.info).to.equal('This is the patched vacanciesByIndustry!!!');
    });
  });

  describe('DELETE /api/vacanciesByIndustrys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vacanciesByIndustry does not exist', function(done) {
      request(app)
        .delete(`/api/vacanciesByIndustrys/${newVacanciesByIndustry._id}`)
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
