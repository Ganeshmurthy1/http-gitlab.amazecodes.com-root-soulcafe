'use strict';

describe('Controller: AdminAddQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminAddQuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminAddQuestionCtrl = $controller('AdminAddQuestionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
