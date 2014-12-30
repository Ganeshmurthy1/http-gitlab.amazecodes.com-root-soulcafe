'use strict';

describe('Controller: HeartStaticsCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var HeartStaticsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeartStaticsCtrl = $controller('HeartStaticsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
