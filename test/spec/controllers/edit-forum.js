'use strict';

describe('Controller: EditForumCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var EditForumCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditForumCtrl = $controller('EditForumCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
