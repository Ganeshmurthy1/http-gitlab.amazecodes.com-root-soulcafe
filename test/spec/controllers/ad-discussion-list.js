'use strict';

describe('Controller: AdDiscussionListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdDiscussionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdDiscussionListCtrl = $controller('AdDiscussionListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
