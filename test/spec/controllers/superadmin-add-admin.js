'use strict';

describe('Controller: SuperadminAddAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminAddAdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminAddAdminCtrl = $controller('SuperadminAddAdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
