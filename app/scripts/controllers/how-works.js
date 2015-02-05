'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HowWorksCtrl
 * @description
 * # HowWorksCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HowWorksCtrl', function ($scope, $location,analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

  });
