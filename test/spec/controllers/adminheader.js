'use strict';

describe('Controller: AdminheaderCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminheaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminheaderCtrl = $controller('AdminheaderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
