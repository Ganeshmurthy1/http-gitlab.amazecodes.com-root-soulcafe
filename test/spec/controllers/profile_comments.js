'use strict';

describe('Controller: ProfileCommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var ProfileCommentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileCommentsCtrl = $controller('ProfileCommentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
