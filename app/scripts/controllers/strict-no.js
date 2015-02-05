'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:StrictNoCtrl
 * @description
 * # StrictNoCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('StrictNoCtrl', function ($scope, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

  });
