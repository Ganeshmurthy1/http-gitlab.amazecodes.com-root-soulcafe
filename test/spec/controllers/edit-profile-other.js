'use strict';

describe('Controller: EditProfileOtherCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var EditProfileOtherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProfileOtherCtrl = $controller('EditProfileOtherCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
