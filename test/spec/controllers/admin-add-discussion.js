'use strict';

describe('Controller: AdminAddDiscussionCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminAddDiscussionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminAddDiscussionCtrl = $controller('AdminAddDiscussionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
