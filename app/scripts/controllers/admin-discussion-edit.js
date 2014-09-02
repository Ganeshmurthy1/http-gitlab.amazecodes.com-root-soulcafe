'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminDiscussionEditCtrl
 * @description
 * # AdminDiscussionEditCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminDiscussionEditCtrl', function ($scope, adminDiscussion, $routeParams, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

// $scope.discussId = $routeParams.discussId;
// console.log($scope.discussId);

adminDiscussion.getdiscussionTopicDetail($routeParams.discussId).then(function (response) {
	    		console.log(response);
	    		$scope.discussion = response.data;
	    		$scope.discussion.discussId = $routeParams.discussId;
	    		console.log($scope.discussion.RestrictedAge);
	    		if ($scope.discussion.Restricted == 1){   
	    		$scope.discussion.Restricted = true;
	    		}
	    		$scope.value=parseInt($scope.discussion.RestrictedAge);
	    		
	    	});


$scope.adminEditDiscussion = function() {
	
  console.log("ABhik");
  $scope.discussion.RestrictedAge = $scope.value;
  if ($scope.discussion.Restricted == true){
  	$scope.discussion.Restricted = 1;
  } else{
  	$scope.discussion.Restricted = 0;
  }
console.log($scope.discussion);
	adminDiscussion.updatediscussionTopicDetail($scope.discussion).then(function (response) {
	    		console.log(response);
	    		if(response.data == "true"){
	    			$location.path('/admin-topic-list');
	    		}
	    	});
};
  });
