'use strict';

describe('Controller: AdminManageQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminManageQuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminManageQuestionCtrl = $controller('AdminManageQuestionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
