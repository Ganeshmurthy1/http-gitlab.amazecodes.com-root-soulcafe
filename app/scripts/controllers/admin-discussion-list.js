'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminDiscussionListCtrl
 * @description
 * # AdminDiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminDiscussionListCtrl', function ($scope, adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function getAdminForum() {
    	adminDiscussion.getAdminDiscussionTotal().then(function (total) {
    		console.log(total.data);
    		 $scope.totalItems = total.data.total;          	
    	});
    	
    	$scope.currentPage = 1;
    	$scope.pagePerItem = 10;
    	$scope.maxSize = 4;
    	var param = new Object();
    	param.start = 0;
    	param.limit = $scope.pagePerItem;
    	
    	adminDiscussion.getAdminDiscussion(param).then(function (results) {
    		//console.log(results.data);
    		$scope.discussions = results.data;          	
    	});
    	
    	
    }
    getAdminForum();

    $scope.pageChanged = function() {
    	delete $scope.discussions;
    	var param = new Object();
    	param.start = $scope.pagePerItem * ($scope.currentPage - 1);
    	param.limit = $scope.pagePerItem;
    	var delay=900;//1 seconds
        setTimeout(function(){
        	
        	adminDiscussion.getAdminDiscussion(param).then(function (res) {
        		//console.log(results.data);
        		delete $scope.discussions;
        		$scope.discussions = res.data;          	
        	});

        //your code to be executed after 1 seconds
        },delay);
    	
    };
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
    		$scope.pageChanged();
    		//delete $scope.discussions;
    	});
    };
    $scope.deactivateForum = function(id) {  
    	adminDiscussion.adminDeActivateDiscussion(id).then(function (total) {
    		$scope.pageChanged();
    		//delete $scope.discussions;
    	});
    };

    
  });
