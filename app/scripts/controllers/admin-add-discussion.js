'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminAddDiscussionCtrl
 * @description
 * # AdminAddDiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminAddDiscussionCtrl', function ($scope, $location, adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.adminAddDiscussion = function() {
    	console.log($scope.discussion);
    	adminDiscussion.addDiscussion($scope.discussion).then(function(response) {
		  console.log(response);
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              $scope.successmessage = "Forum added sucessfully.";
              $scope.errMessage = false;
              $scope.discussion = false;
		  }
		  else {
			  $scope.successmessage = false;
			  $scope.errMessage = response.data;
		  }
       });


    };
    
   
  });
