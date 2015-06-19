'use strict';

describe('Controller: QuestionEditCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var QuestionEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionEditCtrl = $controller('QuestionEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
