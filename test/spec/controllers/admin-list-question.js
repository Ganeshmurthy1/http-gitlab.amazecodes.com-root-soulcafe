'use strict';

describe('Controller: AdminListQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminListQuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminListQuestionCtrl = $controller('AdminListQuestionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
