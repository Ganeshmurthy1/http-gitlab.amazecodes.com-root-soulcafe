'use strict';

describe('Controller: LeftbarQuizCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var LeftbarQuizCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeftbarQuizCtrl = $controller('LeftbarQuizCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
