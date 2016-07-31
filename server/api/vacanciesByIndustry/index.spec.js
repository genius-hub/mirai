'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vacanciesByIndustryCtrlStub = {
  index: 'vacanciesByIndustryCtrl.index',
  show: 'vacanciesByIndustryCtrl.show',
  create: 'vacanciesByIndustryCtrl.create',
  upsert: 'vacanciesByIndustryCtrl.upsert',
  patch: 'vacanciesByIndustryCtrl.patch',
  destroy: 'vacanciesByIndustryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vacanciesByIndustryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vacanciesByIndustry.controller': vacanciesByIndustryCtrlStub
});

describe('VacanciesByIndustry API Router:', function() {
  it('should return an express router instance', function() {
    expect(vacanciesByIndustryIndex).to.equal(routerStub);
  });

  describe('GET /api/vacanciesByIndustrys', function() {
    it('should route to vacanciesByIndustry.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vacanciesByIndustryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/vacanciesByIndustrys/:id', function() {
    it('should route to vacanciesByIndustry.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vacanciesByIndustryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/vacanciesByIndustrys', function() {
    it('should route to vacanciesByIndustry.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vacanciesByIndustryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/vacanciesByIndustrys/:id', function() {
    it('should route to vacanciesByIndustry.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vacanciesByIndustryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vacanciesByIndustrys/:id', function() {
    it('should route to vacanciesByIndustry.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vacanciesByIndustryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vacanciesByIndustrys/:id', function() {
    it('should route to vacanciesByIndustry.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vacanciesByIndustryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
