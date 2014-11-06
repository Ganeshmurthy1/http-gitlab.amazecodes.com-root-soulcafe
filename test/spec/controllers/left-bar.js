'use strict';

describe('Controller: LeftBarCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var LeftBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeftBarCtrl = $controller('LeftBarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
