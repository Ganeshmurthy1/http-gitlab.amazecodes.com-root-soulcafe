'use strict';

describe('Controller: SideBarCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SideBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SideBarCtrl = $controller('SideBarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
