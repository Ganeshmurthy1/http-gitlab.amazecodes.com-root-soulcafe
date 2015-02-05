'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:PrivacyPolicyCtrl
 * @description
 * # PrivacyPolicyCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('PrivacyPolicyCtrl', function ($scope, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

  });
