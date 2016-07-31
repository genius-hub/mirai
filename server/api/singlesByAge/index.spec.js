'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var singlesByAgeCtrlStub = {
  index: 'singlesByAgeCtrl.index',
  show: 'singlesByAgeCtrl.show',
  create: 'singlesByAgeCtrl.create',
  upsert: 'singlesByAgeCtrl.upsert',
  patch: 'singlesByAgeCtrl.patch',
  destroy: 'singlesByAgeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var singlesByAgeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './singlesByAge.controller': singlesByAgeCtrlStub
});

describe('SinglesByAge API Router:', function() {
  it('should return an express router instance', function() {
    expect(singlesByAgeIndex).to.equal(routerStub);
  });

  describe('GET /api/singlesByAges', function() {
    it('should route to singlesByAge.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'singlesByAgeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/singlesByAges/:id', function() {
    it('should route to singlesByAge.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'singlesByAgeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/singlesByAges', function() {
    it('should route to singlesByAge.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'singlesByAgeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/singlesByAges/:id', function() {
    it('should route to singlesByAge.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'singlesByAgeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/singlesByAges/:id', function() {
    it('should route to singlesByAge.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'singlesByAgeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/singlesByAges/:id', function() {
    it('should route to singlesByAge.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'singlesByAgeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
