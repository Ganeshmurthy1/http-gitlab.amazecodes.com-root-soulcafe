'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdDiscussionListCtrl
 * @description
 * # AdDiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdDiscussionListCtrl', function ($scope, adminOperations, adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.adminGetMyForums().then(function (response) {
			console.log(response);
			 $scope.discussions = response.data;
		});
    }
    
    loadAllMessage();
    
    $scope.deleteForum = function(id) {  
    	adminDiscussion.adminDeleteDiscussion(id).then(function (total) {
    		var val;
    		for (val in $scope.discussions) {
                if ($scope.discussions[val].DiscussionBoardId === id) {
                    $scope.discussions[val].deleted = true;
                    break;
                }    		 	
    		}    		 	
    	});
    };
    $scope.activateForum = function(id) {  
    	adminDiscussion.adminActivateDiscussion(id).then(function (total) {    			
    		loadAllMessage();
    		//delete $scope.discussions;
    	});
    };
    $scope.deactivateForum = function(id) {  
    	adminDiscussion.adminDeActivateDiscussion(id).then(function (total) {
    		loadAllMessage();
    		//delete $scope.discussions;
    	});
    };
  });
