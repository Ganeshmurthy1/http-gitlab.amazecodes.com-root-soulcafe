'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminTopicListCtrl
 * @description
 * # AdminTopicListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminTopicListCtrl', function ($scope, adminDiscussion, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function getAdminTopic() {
    	$scope.discussId = $routeParams.discussId;
    	
    	if($routeParams.discussId != undefined) {
    		
    		adminDiscussion.getAdminForumThis($routeParams.discussId).then(function (total) {
	    		console.log(total.data);
	    		 $scope.Forum = total.data;          	
	    	});
    		
	    	adminDiscussion.getAdminTopicTotal($routeParams.discussId).then(function (total) {
	    		console.log(total.data);
	    		 $scope.totalItems = total.data.total;          	
	    	});
	    	
	    	$scope.currentPage = 1;
	    	$scope.pagePerItem = 2;
	    	$scope.maxSize = 4;
	    	var param = new Object();
	    	param.start = 0;
	    	param.limit = $scope.pagePerItem;
	    	param.discussId = $routeParams.discussId;
	    	
	    	adminDiscussion.getAdminTopic(param).then(function (results) {
	    		console.log(results.data);
	    		$scope.topics = results.data;          	
	    	});
    	}
    	
    	
    }
    
    $scope.pageChanged = function() {
    	delete $scope.topics;
    	var param = new Object();
    	param.start = $scope.pagePerItem * ($scope.currentPage - 1);
    	param.limit = $scope.pagePerItem;
    	param.discussId = $routeParams.discussId;
    	var delay=900;//1 seconds
        setTimeout(function(){
        	
        	adminDiscussion.getAdminTopic(param).then(function (res) {
        		//console.log(results.data);
        		//delete $scope.topics;
        		$scope.topics = res.data;          	
        	});

        //your code to be executed after 1 seconds
        },delay);
    	
    };
    
    $scope.deleteTopic = function(id) {  
    	adminDiscussion.adminDeleteTopic(id).then(function (total) {
    		var val;
    		for (val in $scope.topics) {
                if ($scope.topics[val].DiscussionTopicId === id) {
                    $scope.topics[val].deleted = true;
                    break;
                }    		 	
    		}    		 	
    	});
    };
    $scope.activateTopic = function(id) {  
    	adminDiscussion.adminActivateTopic(id).then(function (total) {    			
    		$scope.pageChanged();
    		//delete $scope.discussions;
    	});
    };
    $scope.deactivateTopic = function(id) {  
    	adminDiscussion.adminDeActivateTopic(id).then(function (total) {
    		$scope.pageChanged();
    		//delete $scope.discussions;
    	});
    };

    
    getAdminTopic();
  });
