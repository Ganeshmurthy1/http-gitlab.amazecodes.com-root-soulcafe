'use strict';

describe('Controller: EditProfileNewCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var EditProfileNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProfileNewCtrl = $controller('EditProfileNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
