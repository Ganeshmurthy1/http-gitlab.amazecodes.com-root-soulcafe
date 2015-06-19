'use strict';

describe('Controller: HeaderSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var HeaderSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderSignupCtrl = $controller('HeaderSignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
