'use strict';

describe('Controller: Caurosel2Ctrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var Caurosel2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Caurosel2Ctrl = $controller('Caurosel2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
