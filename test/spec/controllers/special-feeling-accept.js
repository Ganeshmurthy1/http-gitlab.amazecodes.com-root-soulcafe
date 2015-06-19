'use strict';

describe('Controller: SpecialFeelingAcceptCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SpecialFeelingAcceptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecialFeelingAcceptCtrl = $controller('SpecialFeelingAcceptCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
