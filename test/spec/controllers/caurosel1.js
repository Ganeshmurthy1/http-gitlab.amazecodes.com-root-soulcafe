'use strict';

describe('Controller: Caurosel1Ctrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var Caurosel1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Caurosel1Ctrl = $controller('Caurosel1Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
