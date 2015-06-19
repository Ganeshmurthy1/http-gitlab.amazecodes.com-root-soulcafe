'use strict';

describe('Controller: AdminTopicViewCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminTopicViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTopicViewCtrl = $controller('AdminTopicViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
