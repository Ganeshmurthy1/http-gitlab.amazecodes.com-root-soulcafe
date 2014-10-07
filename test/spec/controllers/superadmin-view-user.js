'use strict';

describe('Controller: SuperadminViewUserCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminViewUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminViewUserCtrl = $controller('SuperadminViewUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
