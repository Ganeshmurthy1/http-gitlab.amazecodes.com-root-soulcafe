'use strict';

describe('Controller: AdminRequestedTopicCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminRequestedTopicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminRequestedTopicCtrl = $controller('AdminRequestedTopicCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
