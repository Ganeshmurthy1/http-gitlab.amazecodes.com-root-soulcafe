'use strict';

describe('Controller: LinkedinSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var LinkedinSuccessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LinkedinSuccessCtrl = $controller('LinkedinSuccessCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
