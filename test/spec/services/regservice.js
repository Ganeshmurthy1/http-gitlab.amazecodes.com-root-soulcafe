'use strict';

describe('Service: regService', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var regService;
  beforeEach(inject(function (_regService_) {
    regService = _regService_;
  }));

  it('should do something', function () {
    expect(!!regService).toBe(true);
  });

});
