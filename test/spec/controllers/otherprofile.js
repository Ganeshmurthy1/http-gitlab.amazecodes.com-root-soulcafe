'use strict';

describe('Controller: OtherprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var OtherprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtherprofileCtrl = $controller('OtherprofileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
