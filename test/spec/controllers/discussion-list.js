'use strict';

describe('Controller: DiscussionListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var DiscussionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscussionListCtrl = $controller('DiscussionListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
