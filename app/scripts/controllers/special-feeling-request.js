'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SpecialFeelingRequestCtrl
 * @description
 * # SpecialFeelingRequestCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SpecialFeelingRequestCtrl', function ($scope,$routeParams,$location,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user_id = $routeParams.user_id;
    $scope.status = true;
    profileOperations.checkFeelingStatus($scope.user_id).then(function(response) {
  		console.log(response);
      if(response.data != "true") {
        $scope.status = false;
        $scope.Message = response.data;
      }
 	});
    
    
    $scope.feelingSend = function(){
    	console.log($scope.user_id);
    	profileOperations.sendFeeling($scope.user_id).then(function(response) {
      		console.log(response);
          if(response.data == "true"){
            $location.url("/friends?q=102")
          }
     	});
    }

  });
