'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminAddTopicCtrl
 * @description
 * # AdminAddTopicCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminAddTopicCtrl', function ($scope, adminDiscussion, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.discussId = $routeParams.discussId;
    $scope.adminAddTopic = function() {
    	$scope.topic.discussId = $routeParams.discussId;
    	console.log($scope.topic);
    	adminDiscussion.addTopic($scope.topic).then(function(response) {
		  console.log(response);
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              $scope.successmessage = "Forum added sucessfully.";
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
