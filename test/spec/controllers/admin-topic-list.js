'use strict';

describe('Controller: AdminTopicListCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AdminTopicListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTopicListCtrl = $controller('AdminTopicListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
