'use strict';

describe('Controller: AdminAddMessageCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminAddMessageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminAddMessageCtrl = $controller('AdminAddMessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
