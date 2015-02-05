'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AboutUsCtrl
 * @description
 * # AboutUsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AboutUsCtrl', function ($scope,$location,analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());
  });
