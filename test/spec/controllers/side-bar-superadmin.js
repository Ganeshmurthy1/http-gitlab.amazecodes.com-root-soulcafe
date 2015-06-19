'use strict';

describe('Controller: SideBarSuperadminCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SideBarSuperadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SideBarSuperadminCtrl = $controller('SideBarSuperadminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
