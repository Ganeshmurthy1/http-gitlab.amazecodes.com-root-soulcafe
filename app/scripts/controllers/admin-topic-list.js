'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminTopicListCtrl
 * @description
 * # AdminTopicListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminTopicListCtrl', function ($scope, adminDiscussion, $routeParams, localStorageService, config) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
    function getAdminTopic() {
    	$scope.discussId = $routeParams.discussId;
    	
    	if($routeParams.discussId != undefined) {
    		
    		adminDiscussion.getAdminForumThis($routeParams.discussId).then(function (total) {
	    		 $scope.Forum = total.data;          	
	    	});
    		
	    	adminDiscussion.getAdminTopicTotal($routeParams.discussId).then(function (total) {
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
    	});
    };
    $scope.deactivateTopic = function(id) {  
    	adminDiscussion.adminDeActivateTopic(id).then(function (total) {
    		$scope.pageChanged();
    	});
    };

    
    getAdminTopic();
  });
