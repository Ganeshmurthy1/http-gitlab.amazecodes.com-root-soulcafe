'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SpecialFeelingHistoryCtrl
 * @description
 * # SpecialFeelingHistoryCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SpecialFeelingHistoryCtrl', function ($scope,profileOperations, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    profileOperations.historyFeeling($scope.user_id).then(function(response) {
      		console.log(response);
      		$scope.response = response.data;
     	});
  });
