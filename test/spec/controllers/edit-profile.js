'use strict';

describe('Controller: EditProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var EditProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProfileCtrl = $controller('EditProfileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
