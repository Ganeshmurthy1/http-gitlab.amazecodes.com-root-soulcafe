'use strict';

describe('Service: Questionnaire', function () {

  // load the service's module
  beforeEach(module('sassApp'));

  // instantiate service
  var Questionnaire;
  beforeEach(inject(function (_Questionnaire_) {
    Questionnaire = _Questionnaire_;
  }));

  it('should do something', function () {
    expect(!!Questionnaire).toBe(true);
  });

});
