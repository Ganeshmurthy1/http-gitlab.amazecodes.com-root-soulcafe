'use strict';

describe('Controller: SuperadminProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminProfileCtrl = $controller('SuperadminProfileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
