'use strict';

describe('Controller: SideBarAnonCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SideBarAnonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SideBarAnonCtrl = $controller('SideBarAnonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
