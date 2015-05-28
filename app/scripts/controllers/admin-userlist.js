'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminUserlistCtrl
 * @description
 * # AdminUserlistCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminUserlistCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function loadAllusers() {
    	
    	adminOperations.adminGetTotalUsersCount().then(function (total) {
    		$scope.totalItems = total.data.total;
    		console.log(total);
		});
    	
    	$scope.currentPage = 1;
    	$scope.pagePerItem = 10;
    	$scope.maxSize = 4;
    	var param = new Object();
    	param.start = 0;
    	param.limit = $scope.pagePerItem;
    	
	    adminOperations.adminGetAllUsersPagination(param).then(function (response) {
			 $scope.comm = response.data;
		});
    }
    
    $scope.pageChanged = function() {
    	delete $scope.discussions;
    	var param = new Object();
    	param.start = $scope.pagePerItem * ($scope.currentPage - 1);
    	param.limit = $scope.pagePerItem;
//    	/
        adminOperations.adminGetAllUsersPagination(param).then(function (response) {
   			 $scope.comm = response.data;
   		});

        //your code to be executed after 1 seconds
//        },delay);
    	
    };
    
    $scope.deactivateUser = function(id) {  
    	adminOperations.admindeActivateUser(id).then(function (total) {    			
    		loadAllusers();
    	});
    };
    
    loadAllusers();

  });
