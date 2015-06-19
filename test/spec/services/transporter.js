'use strict';

describe('Service: Transporter', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var Transporter;
  beforeEach(inject(function (_Transporter_) {
    Transporter = _Transporter_;
  }));

  it('should do something', function () {
    expect(!!Transporter).toBe(true);
  });

});
