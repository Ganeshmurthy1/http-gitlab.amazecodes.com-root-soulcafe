'use strict';

describe('Controller: ReplyMessageCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var ReplyMessageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReplyMessageCtrl = $controller('ReplyMessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
