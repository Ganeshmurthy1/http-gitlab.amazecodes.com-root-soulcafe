'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AddTopicCtrl
 * @description
 * # AddTopicCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AddTopicCtrl', function ($scope,$location,regService,$routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


      $scope.discussId = $routeParams.discussId;

   		$scope.AddTopic = function() {	
      	$scope.topic.discussId = $routeParams.discussId;
      	regService.addTopic($scope.topic).then(function(response) {
  		  if (response.data == 'true') {
  			  $scope.savedSuccessfully = true;
          $location.url('/discussion-list?q=111' );
          $scope.errMessage = false;
          $scope.topic = false;
  		  }
  		  else {
  			  $scope.successmessage = false;
  			  $scope.errMessage = response.data;
  		  }
         });
      };


  });

