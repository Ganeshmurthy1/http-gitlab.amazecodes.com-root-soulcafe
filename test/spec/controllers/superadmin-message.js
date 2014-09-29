'use strict';

describe('Controller: SuperadminMessageCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminMessageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminMessageCtrl = $controller('SuperadminMessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
