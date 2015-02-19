'use strict';

describe('Controller: TermConditionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var TermConditionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TermConditionCtrl = $controller('TermConditionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
