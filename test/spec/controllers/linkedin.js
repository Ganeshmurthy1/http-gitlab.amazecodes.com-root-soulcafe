'use strict';

describe('Controller: LinkedinCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var LinkedinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LinkedinCtrl = $controller('LinkedinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
