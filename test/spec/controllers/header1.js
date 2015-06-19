'use strict';

describe('Controller: Header1Ctrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var Header1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Header1Ctrl = $controller('Header1Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
