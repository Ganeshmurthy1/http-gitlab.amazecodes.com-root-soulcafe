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
    console.log($scope.userId);
    adminOperations.viewProfileData($scope.userId).then(function (response) {
			console.log(response.data);
			console.log(response.data.topics);
			$scope.message = response.data.message;
			$scope.gtky = response.data.gtky;
			$scope.comments = response.data.comments;
			$scope.topics = response.data.topics;
			 // $scope.comm = response.data;
		});


    regService.getUserDetails($scope.userId).then(function (results) {
    		 // console.log(results.data);
    		$scope.userData = results.data; 
        console.log($scope.userData);
        if($scope.userData.status == 1){
        	$scope.btn = 'true';
        } else if($scope.userData.status == 0){
        	$scope.btn = 'false';
        }
    	});


    $scope.activateUser = function(){
    	adminOperations.userActivate($scope.userId).then(function (response) {
			console.log(response.data);

			if(response.data == 'true'){
				regService.getUserDetails($scope.userId).then(function (results) {
		    		 // console.log(results.data);
		    		$scope.userData = results.data; 
		        console.log($scope.userData);
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
			console.log(response.data);

			if(response.data == 'true'){
				regService.getUserDetails($scope.userId).then(function (results) {
		    		 // console.log(results.data);
		    		$scope.userData = results.data; 
		        console.log($scope.userData);
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
