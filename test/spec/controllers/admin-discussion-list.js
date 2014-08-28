'use strict';

describe('Controller: AdminDiscussionListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminDiscussionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminDiscussionListCtrl = $controller('AdminDiscussionListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
