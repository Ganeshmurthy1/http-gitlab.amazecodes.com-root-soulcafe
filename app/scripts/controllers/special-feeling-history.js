'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SpecialFeelingHistoryCtrl
 * @description
 * # SpecialFeelingHistoryCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SpecialFeelingHistoryCtrl', function ($scope,profileOperations, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    profileOperations.historyFeeling($scope.user_id).then(function(response) {
      		console.log(response);
      		$scope.response = response.data;
     	});
  });
