'use strict';

describe('Controller: StrictNoCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var StrictNoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StrictNoCtrl = $controller('StrictNoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
