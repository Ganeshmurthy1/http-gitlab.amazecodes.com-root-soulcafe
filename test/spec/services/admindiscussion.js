'use strict';

describe('Service: adminDiscussion', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var adminDiscussion;
  beforeEach(inject(function (_adminDiscussion_) {
    adminDiscussion = _adminDiscussion_;
  }));

  it('should do something', function () {
    expect(!!adminDiscussion).toBe(true);
  });

});
