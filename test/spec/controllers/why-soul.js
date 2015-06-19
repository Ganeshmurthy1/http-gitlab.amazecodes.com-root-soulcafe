'use strict';

describe('Controller: WhySoulCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var WhySoulCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WhySoulCtrl = $controller('WhySoulCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
