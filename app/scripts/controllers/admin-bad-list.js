'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminBadListCtrl
 * @description
 * # AdminBadListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminBadListCtrl', function ($scope, adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function getAdminBadList() {    	
    	
    	adminDiscussion.getAdminBadList().then(function (results) {
    	    // console.log(results.data);
    		$scope.discussions = results.data;          	
    	});   	
    	
    }
    $scope.notASpam = function(id) {  
    	adminDiscussion.adminNotASpam(id).then(function (total) {    			
        getAdminBadList();
    		//delete $scope.discussions;
    	});
    };
    $scope.markAsSpam = function(id) {  
    	adminDiscussion.adminMarkAsSpam(id).then(function (total) {    			
        getAdminBadList();
    		//delete $scope.discussions;
    	});
    };
    getAdminBadList();
  });
