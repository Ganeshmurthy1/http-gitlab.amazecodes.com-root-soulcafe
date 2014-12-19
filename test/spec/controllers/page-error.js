'use strict';

describe('Controller: PageErrorCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var PageErrorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PageErrorCtrl = $controller('PageErrorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
