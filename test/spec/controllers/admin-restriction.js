'use strict';

describe('Controller: AdminRestrictionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminRestrictionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminRestrictionCtrl = $controller('AdminRestrictionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
