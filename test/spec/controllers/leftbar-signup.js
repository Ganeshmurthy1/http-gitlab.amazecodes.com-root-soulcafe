'use strict';

describe('Controller: LeftbarSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var LeftbarSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeftbarSignupCtrl = $controller('LeftbarSignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
