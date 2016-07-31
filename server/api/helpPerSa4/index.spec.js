'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var helpPerSa4CtrlStub = {
  index: 'helpPerSa4Ctrl.index',
  show: 'helpPerSa4Ctrl.show',
  create: 'helpPerSa4Ctrl.create',
  upsert: 'helpPerSa4Ctrl.upsert',
  patch: 'helpPerSa4Ctrl.patch',
  destroy: 'helpPerSa4Ctrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var helpPerSa4Index = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './helpPerSa4.controller': helpPerSa4CtrlStub
});

describe('HelpPerSa4 API Router:', function() {
  it('should return an express router instance', function() {
    expect(helpPerSa4Index).to.equal(routerStub);
  });

  describe('GET /api/helpPerSa4s', function() {
    it('should route to helpPerSa4.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'helpPerSa4Ctrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/helpPerSa4s/:id', function() {
    it('should route to helpPerSa4.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'helpPerSa4Ctrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/helpPerSa4s', function() {
    it('should route to helpPerSa4.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'helpPerSa4Ctrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/helpPerSa4s/:id', function() {
    it('should route to helpPerSa4.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'helpPerSa4Ctrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/helpPerSa4s/:id', function() {
    it('should route to helpPerSa4.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'helpPerSa4Ctrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/helpPerSa4s/:id', function() {
    it('should route to helpPerSa4.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'helpPerSa4Ctrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
