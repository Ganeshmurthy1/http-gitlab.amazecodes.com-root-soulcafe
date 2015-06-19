'use strict';

describe('Controller: AdminBadListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminBadListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminBadListCtrl = $controller('AdminBadListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
