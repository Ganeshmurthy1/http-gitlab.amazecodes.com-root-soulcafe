'use strict';

describe('Controller: AdminInappropriateCommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminInappropriateCommentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminInappropriateCommentsCtrl = $controller('AdminInappropriateCommentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
