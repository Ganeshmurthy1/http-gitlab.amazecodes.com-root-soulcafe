'use strict';

describe('Controller: DiscussionTopicsCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var DiscussionTopicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscussionTopicsCtrl = $controller('DiscussionTopicsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
