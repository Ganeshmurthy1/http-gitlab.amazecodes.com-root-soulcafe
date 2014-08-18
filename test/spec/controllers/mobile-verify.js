'use strict';

describe('Controller: MobileVerifyCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var MobileVerifyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MobileVerifyCtrl = $controller('MobileVerifyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
