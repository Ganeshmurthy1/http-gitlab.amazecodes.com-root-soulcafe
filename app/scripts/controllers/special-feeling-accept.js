'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SpecialFeelingAcceptCtrl
 * @description
 * # SpecialFeelingAcceptCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SpecialFeelingAcceptCtrl', function ($scope,$location,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    profileOperations.getFeelings().then(function(response) {
      		console.log(response);
      		$scope.request = response.data;
    });

    $scope.notSure=function(id){
      // console.log($scope.request.SenderId);
      profileOperations.notSureFeelings(id).then(function(response) {
          console.log(response);
          if(response.data == "true"){
            $location.url("/home?status=1")
          }
    });
    }

    $scope.notYet=function(id){
      // console.log($scope.request.SenderId);
      profileOperations.notYetFeelings(id).then(function(response) {
          console.log(response);
          if(response.data == "true"){
            $location.url("/home?status=1")
          }
    });
    }

    $scope.needTime=function(id){
      // console.log($scope.request.SenderId);
      profileOperations.needTimeFeelings(id).then(function(response) {
          console.log(response);
          if(response.data == "true"){
            $location.url("/home?status=1")
          }
    });
    }

    $scope.acceptFeeling=function(id){
      // console.log($scope.request.SenderId);
      profileOperations.acceptFeeling(id).then(function(response) {
          console.log(response);
          if(response.data == "true"){
            $location.url("/home?status=1")
          }
    });
    }
    
  });
