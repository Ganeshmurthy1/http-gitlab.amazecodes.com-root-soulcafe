'use strict';

describe('Controller: AdminDiscussionboardabuseListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminDiscussionboardabuseListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminDiscussionboardabuseListCtrl = $controller('AdminDiscussionboardabuseListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
