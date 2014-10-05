'use strict';

describe('Service: adminOperations', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var adminOperations;
  beforeEach(inject(function (_adminOperations_) {
    adminOperations = _adminOperations_;
  }));

  it('should do something', function () {
    expect(!!adminOperations).toBe(true);
  });

});
