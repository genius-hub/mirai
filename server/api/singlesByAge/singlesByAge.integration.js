'use strict';

var app = require('../..');
import request from 'supertest';

var newSinglesByAge;

describe('SinglesByAge API:', function() {
  describe('GET /api/singlesByAges', function() {
    var singlesByAges;

    beforeEach(function(done) {
      request(app)
        .get('/api/singlesByAges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          singlesByAges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(singlesByAges).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/singlesByAges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/singlesByAges')
        .send({
          name: 'New SinglesByAge',
          info: 'This is the brand new singlesByAge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSinglesByAge = res.body;
          done();
        });
    });

    it('should respond with the newly created singlesByAge', function() {
      expect(newSinglesByAge.name).to.equal('New SinglesByAge');
      expect(newSinglesByAge.info).to.equal('This is the brand new singlesByAge!!!');
    });
  });

  describe('GET /api/singlesByAges/:id', function() {
    var singlesByAge;

    beforeEach(function(done) {
      request(app)
        .get(`/api/singlesByAges/${newSinglesByAge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          singlesByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      singlesByAge = {};
    });

    it('should respond with the requested singlesByAge', function() {
      expect(singlesByAge.name).to.equal('New SinglesByAge');
      expect(singlesByAge.info).to.equal('This is the brand new singlesByAge!!!');
    });
  });

  describe('PUT /api/singlesByAges/:id', function() {
    var updatedSinglesByAge;

    beforeEach(function(done) {
      request(app)
        .put(`/api/singlesByAges/${newSinglesByAge._id}`)
        .send({
          name: 'Updated SinglesByAge',
          info: 'This is the updated singlesByAge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSinglesByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSinglesByAge = {};
    });

    it('should respond with the original singlesByAge', function() {
      expect(updatedSinglesByAge.name).to.equal('New SinglesByAge');
      expect(updatedSinglesByAge.info).to.equal('This is the brand new singlesByAge!!!');
    });

    it('should respond with the updated singlesByAge on a subsequent GET', function(done) {
      request(app)
        .get(`/api/singlesByAges/${newSinglesByAge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let singlesByAge = res.body;

          expect(singlesByAge.name).to.equal('Updated SinglesByAge');
          expect(singlesByAge.info).to.equal('This is the updated singlesByAge!!!');

          done();
        });
    });
  });

  describe('PATCH /api/singlesByAges/:id', function() {
    var patchedSinglesByAge;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/singlesByAges/${newSinglesByAge._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched SinglesByAge' },
          { op: 'replace', path: '/info', value: 'This is the patched singlesByAge!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSinglesByAge = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSinglesByAge = {};
    });

    it('should respond with the patched singlesByAge', function() {
      expect(patchedSinglesByAge.name).to.equal('Patched SinglesByAge');
      expect(patchedSinglesByAge.info).to.equal('This is the patched singlesByAge!!!');
    });
  });

  describe('DELETE /api/singlesByAges/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/singlesByAges/${newSinglesByAge._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when singlesByAge does not exist', function(done) {
      request(app)
        .delete(`/api/singlesByAges/${newSinglesByAge._id}`)
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
