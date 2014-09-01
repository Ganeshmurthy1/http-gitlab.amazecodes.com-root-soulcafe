'use strict';

describe('Controller: AddTopicCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var AddTopicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddTopicCtrl = $controller('AddTopicCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
