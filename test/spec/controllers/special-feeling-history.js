'use strict';

describe('Controller: SpecialFeelingHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SpecialFeelingHistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecialFeelingHistoryCtrl = $controller('SpecialFeelingHistoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
