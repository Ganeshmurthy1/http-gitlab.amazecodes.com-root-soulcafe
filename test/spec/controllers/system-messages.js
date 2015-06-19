'use strict';

describe('Controller: SystemMessagesCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SystemMessagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SystemMessagesCtrl = $controller('SystemMessagesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
