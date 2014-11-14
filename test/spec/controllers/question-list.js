'use strict';

describe('Controller: QuestionListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var QuestionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionListCtrl = $controller('QuestionListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
