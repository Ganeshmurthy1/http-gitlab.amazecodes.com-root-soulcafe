'use strict';

describe('Controller: ReportAbuseUserCtrl', function () {

  // load the controller's module
  beforeEach(module('sassApp'));

  var ReportAbuseUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportAbuseUserCtrl = $controller('ReportAbuseUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
