'use strict';

var app = require('../..');
import request from 'supertest';

var newHelpPerSa4;

describe('HelpPerSa4 API:', function() {
  describe('GET /api/helpPerSa4s', function() {
    var helpPerSa4s;

    beforeEach(function(done) {
      request(app)
        .get('/api/helpPerSa4s')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          helpPerSa4s = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(helpPerSa4s).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/helpPerSa4s', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/helpPerSa4s')
        .send({
          name: 'New HelpPerSa4',
          info: 'This is the brand new helpPerSa4!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newHelpPerSa4 = res.body;
          done();
        });
    });

    it('should respond with the newly created helpPerSa4', function() {
      expect(newHelpPerSa4.name).to.equal('New HelpPerSa4');
      expect(newHelpPerSa4.info).to.equal('This is the brand new helpPerSa4!!!');
    });
  });

  describe('GET /api/helpPerSa4s/:id', function() {
    var helpPerSa4;

    beforeEach(function(done) {
      request(app)
        .get(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          helpPerSa4 = res.body;
          done();
        });
    });

    afterEach(function() {
      helpPerSa4 = {};
    });

    it('should respond with the requested helpPerSa4', function() {
      expect(helpPerSa4.name).to.equal('New HelpPerSa4');
      expect(helpPerSa4.info).to.equal('This is the brand new helpPerSa4!!!');
    });
  });

  describe('PUT /api/helpPerSa4s/:id', function() {
    var updatedHelpPerSa4;

    beforeEach(function(done) {
      request(app)
        .put(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
        .send({
          name: 'Updated HelpPerSa4',
          info: 'This is the updated helpPerSa4!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedHelpPerSa4 = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHelpPerSa4 = {};
    });

    it('should respond with the original helpPerSa4', function() {
      expect(updatedHelpPerSa4.name).to.equal('New HelpPerSa4');
      expect(updatedHelpPerSa4.info).to.equal('This is the brand new helpPerSa4!!!');
    });

    it('should respond with the updated helpPerSa4 on a subsequent GET', function(done) {
      request(app)
        .get(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let helpPerSa4 = res.body;

          expect(helpPerSa4.name).to.equal('Updated HelpPerSa4');
          expect(helpPerSa4.info).to.equal('This is the updated helpPerSa4!!!');

          done();
        });
    });
  });

  describe('PATCH /api/helpPerSa4s/:id', function() {
    var patchedHelpPerSa4;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched HelpPerSa4' },
          { op: 'replace', path: '/info', value: 'This is the patched helpPerSa4!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedHelpPerSa4 = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedHelpPerSa4 = {};
    });

    it('should respond with the patched helpPerSa4', function() {
      expect(patchedHelpPerSa4.name).to.equal('Patched HelpPerSa4');
      expect(patchedHelpPerSa4.info).to.equal('This is the patched helpPerSa4!!!');
    });
  });

  describe('DELETE /api/helpPerSa4s/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when helpPerSa4 does not exist', function(done) {
      request(app)
        .delete(`/api/helpPerSa4s/${newHelpPerSa4._id}`)
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
