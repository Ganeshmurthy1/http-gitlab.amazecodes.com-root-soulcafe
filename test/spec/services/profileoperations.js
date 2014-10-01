'use strict';

describe('Service: profileOperations', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var profileOperations;
  beforeEach(inject(function (_profileOperations_) {
    profileOperations = _profileOperations_;
  }));

  it('should do something', function () {
    expect(!!profileOperations).toBe(true);
  });

});
