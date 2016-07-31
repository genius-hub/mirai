'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var averageIncomeByAgeCtrlStub = {
  index: 'averageIncomeByAgeCtrl.index',
  show: 'averageIncomeByAgeCtrl.show',
  create: 'averageIncomeByAgeCtrl.create',
  upsert: 'averageIncomeByAgeCtrl.upsert',
  patch: 'averageIncomeByAgeCtrl.patch',
  destroy: 'averageIncomeByAgeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var averageIncomeByAgeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './averageIncomeByAge.controller': averageIncomeByAgeCtrlStub
});

describe('AverageIncomeByAge API Router:', function() {
  it('should return an express router instance', function() {
    expect(averageIncomeByAgeIndex).to.equal(routerStub);
  });

  describe('GET /api/averageIncomeByAges', function() {
    it('should route to averageIncomeByAge.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'averageIncomeByAgeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/averageIncomeByAges/:id', function() {
    it('should route to averageIncomeByAge.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'averageIncomeByAgeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/averageIncomeByAges', function() {
    it('should route to averageIncomeByAge.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'averageIncomeByAgeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/averageIncomeByAges/:id', function() {
    it('should route to averageIncomeByAge.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'averageIncomeByAgeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/averageIncomeByAges/:id', function() {
    it('should route to averageIncomeByAge.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'averageIncomeByAgeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/averageIncomeByAges/:id', function() {
    it('should route to averageIncomeByAge.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'averageIncomeByAgeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
