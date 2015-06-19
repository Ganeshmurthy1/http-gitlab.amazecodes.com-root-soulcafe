'use strict';

describe('Service: messageCodes', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var messageCodes;
  beforeEach(inject(function (_messageCodes_) {
    messageCodes = _messageCodes_;
  }));

  it('should do something', function () {
    expect(!!messageCodes).toBe(true);
  });

});
