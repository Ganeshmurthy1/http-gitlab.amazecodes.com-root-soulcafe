'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminViewUserCtrl
 * @description
 * # SuperadminViewUserCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminViewUserCtrl', function ($scope,$routeParams,adminOperations,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.userId=$routeParams.userid;
    
    adminOperations.viewProfileData($scope.userId).then(function (response) {
			
			$scope.message = response.data.message;
			$scope.gtky = response.data.gtky;
			$scope.comments = response.data.comments;
			$scope.topics = response.data.topics;
			 
		});


    regService.getUserDetails($scope.userId).then(function (results) {
    		 
    		$scope.userData = results.data; 
        
        if($scope.userData.status == 1){
        	$scope.btn = 'true';
        } else if($scope.userData.status == 0){
        	$scope.btn = 'false';
        }
    	});


    $scope.activateUser = function(){
    	adminOperations.userActivate($scope.userId).then(function (response) {
			
			if(response.data == 'true'){
				regService.getUserDetails($scope.userId).then(function (results) {
		    		 
		    		$scope.userData = results.data; 
		        
		        if($scope.userData.status == 1){
		        	$scope.btn = 'true';
		        } else if($scope.userData.status == 0){
		        	$scope.btn = 'false';
		        }
		    	});
			}
		});

    }

    $scope.deactivateUser = function(){
    	adminOperations.userDeactivate($scope.userId).then(function (response) {
			
			if(response.data == 'true'){
				regService.getUserDetails($scope.userId).then(function (results) {
		    		 
		    		$scope.userData = results.data; 
		   
		        if($scope.userData.status == 1){
		        	$scope.btn = 'true';
		        } else if($scope.userData.status == 0){
		        	$scope.btn = 'false';
		        }
		    	});
			}
		});
    }
    
  });
