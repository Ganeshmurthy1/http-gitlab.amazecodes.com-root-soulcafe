'use strict';

describe('Controller: ConfirmgtkyCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var ConfirmgtkyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmgtkyCtrl = $controller('ConfirmgtkyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
