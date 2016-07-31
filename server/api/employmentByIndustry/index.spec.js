'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var employmentByIndustryCtrlStub = {
  index: 'employmentByIndustryCtrl.index',
  show: 'employmentByIndustryCtrl.show',
  create: 'employmentByIndustryCtrl.create',
  upsert: 'employmentByIndustryCtrl.upsert',
  patch: 'employmentByIndustryCtrl.patch',
  destroy: 'employmentByIndustryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var employmentByIndustryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './employmentByIndustry.controller': employmentByIndustryCtrlStub
});

describe('EmploymentByIndustry API Router:', function() {
  it('should return an express router instance', function() {
    expect(employmentByIndustryIndex).to.equal(routerStub);
  });

  describe('GET /api/employmentByIndustrys', function() {
    it('should route to employmentByIndustry.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'employmentByIndustryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/employmentByIndustrys/:id', function() {
    it('should route to employmentByIndustry.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'employmentByIndustryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/employmentByIndustrys', function() {
    it('should route to employmentByIndustry.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'employmentByIndustryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/employmentByIndustrys/:id', function() {
    it('should route to employmentByIndustry.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'employmentByIndustryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/employmentByIndustrys/:id', function() {
    it('should route to employmentByIndustry.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'employmentByIndustryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/employmentByIndustrys/:id', function() {
    it('should route to employmentByIndustry.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'employmentByIndustryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
