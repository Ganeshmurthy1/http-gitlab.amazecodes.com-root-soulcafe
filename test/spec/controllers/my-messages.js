'use strict';

describe('Controller: MyMessagesCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var MyMessagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyMessagesCtrl = $controller('MyMessagesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
