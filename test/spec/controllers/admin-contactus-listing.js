'use strict';

describe('Controller: AdminContactusListingCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminContactusListingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminContactusListingCtrl = $controller('AdminContactusListingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
