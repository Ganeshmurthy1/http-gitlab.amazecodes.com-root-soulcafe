'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AddTopicCtrl
 * @description
 * # AddTopicCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AddTopicCtrl', function ($scope,regService,$routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


        $scope.discussId = $routeParams.discussId;

   		$scope.AddTopic = function() {
   			
    	$scope.topic.discussId = $routeParams.discussId;
    	console.log($scope.topic);

    	regService.addTopic($scope.topic).then(function(response) {

		  console.log(response);

		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              $scope.successmessage = "The topic will be posted soon after review.";
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
