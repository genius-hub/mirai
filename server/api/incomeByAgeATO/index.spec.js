'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var incomeByAgeATOCtrlStub = {
  index: 'incomeByAgeATOCtrl.index',
  show: 'incomeByAgeATOCtrl.show',
  create: 'incomeByAgeATOCtrl.create',
  upsert: 'incomeByAgeATOCtrl.upsert',
  patch: 'incomeByAgeATOCtrl.patch',
  destroy: 'incomeByAgeATOCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var incomeByAgeATOIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './incomeByAgeATO.controller': incomeByAgeATOCtrlStub
});

describe('IncomeByAgeATO API Router:', function() {
  it('should return an express router instance', function() {
    expect(incomeByAgeATOIndex).to.equal(routerStub);
  });

  describe('GET /api/incomeByAgeATOs', function() {
    it('should route to incomeByAgeATO.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'incomeByAgeATOCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/incomeByAgeATOs/:id', function() {
    it('should route to incomeByAgeATO.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'incomeByAgeATOCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/incomeByAgeATOs', function() {
    it('should route to incomeByAgeATO.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'incomeByAgeATOCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/incomeByAgeATOs/:id', function() {
    it('should route to incomeByAgeATO.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'incomeByAgeATOCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/incomeByAgeATOs/:id', function() {
    it('should route to incomeByAgeATO.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'incomeByAgeATOCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/incomeByAgeATOs/:id', function() {
    it('should route to incomeByAgeATO.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'incomeByAgeATOCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
