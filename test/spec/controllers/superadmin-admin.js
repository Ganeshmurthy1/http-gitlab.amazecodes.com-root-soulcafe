'use strict';

describe('Controller: SuperadminAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var SuperadminAdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminAdminCtrl = $controller('SuperadminAdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
