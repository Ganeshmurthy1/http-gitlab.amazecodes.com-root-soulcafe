'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:PageErrorCtrl
 * @description
 * # PageErrorCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('PageErrorCtrl', function ($scope, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

  });
