'use strict';

describe('Controller: AcceptGtkyCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AcceptGtkyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AcceptGtkyCtrl = $controller('AcceptGtkyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
