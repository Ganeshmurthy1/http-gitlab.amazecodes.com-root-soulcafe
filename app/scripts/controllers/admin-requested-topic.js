'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminRequestedTopicCtrl
 * @description
 * # AdminRequestedTopicCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminRequestedTopicCtrl', function ($scope, adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   adminDiscussion.getRequestedTopic().then(function (total) {
	    		console.log(total.data);
	    		$scope.rtopics = total.data;          	
	    	});

   $scope.deleteTopic = function(id) {  
    	adminDiscussion.adminDeleteTopic(id).then(function (total) {
    		var val;
    		for (val in $scope.topics) {
                if ($scope.topics[val].DiscussionTopicId === id) {
                    $scope.topics[val].deleted = true;
                    break;
                }    		 	
    		}  
    		adminDiscussion.getRequestedTopic().then(function (total) {
	    		console.log(total.data);
	    		$scope.rtopics = total.data;          	
	    	});  		 	
    	});
    };
    $scope.activateTopic = function(id) {  
    	adminDiscussion.adminActivateTopic(id).then(function (total) {    			
    		// $scope.pageChanged();
    		 adminDiscussion.getRequestedTopic().then(function (total) {
	    		console.log(total.data);
	    		$scope.rtopics = total.data;          	
	    	});
    	});
    };
    $scope.deactivateTopic = function(id) {  
    	adminDiscussion.adminDeActivateTopic(id).then(function (total) {
    		// $scope.pageChanged();
    		 adminDiscussion.getRequestedTopic().then(function (total) {
	    		console.log(total.data);
	    		$scope.rtopics = total.data;          	
	    	});
    	});
    };

  });
