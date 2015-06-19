'use strict';

describe('Controller: SuperadminBlockuserCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminBlockuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminBlockuserCtrl = $controller('SuperadminBlockuserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
