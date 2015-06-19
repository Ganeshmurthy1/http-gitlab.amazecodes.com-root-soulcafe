'use strict';

describe('Controller: HowWorksCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var HowWorksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowWorksCtrl = $controller('HowWorksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
