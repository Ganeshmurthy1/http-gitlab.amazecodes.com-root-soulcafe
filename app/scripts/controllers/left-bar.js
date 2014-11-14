'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftBarCtrl
 * @description
 * # LeftBarCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftBarCtrl', function ($scope, localStorageService, regService, profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.LeftBar = 'views/left-bar.html';

    function getUSerdata() {
    	var authData = localStorageService.get('authorizationData');
    	
     
    	regService.getUserDetails(authData.user_id).then(function (results) {
    		console.log(results.data);
    		$scope.userData = results.data; 
	    	var d1 = new Date($scope.userData.birthdate);
	    	var d2 = new Date();
			$scope.diff = d2.getFullYear()-d1.getFullYear();
			console.log($scope.diff);
	        console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.updateButton = 'true';
           console.log("Abhik");
          regService.getLinkedinProffesionaldetails(authData.user_id).then(function(response) {
                  // console.log(response);
                  $scope.proffesionalDetails = response;
                  console.log($scope.proffesionalDetails);
                });
      
        }   	
    	});
     
      }
    
    getUSerdata();

    profileOperations.getBuddies().then(function(response) {
      
      console.log(response);    
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
          console.log($scope.discussion); 
          $scope.totalfriends=$scope.friends.length;       
     });

   
  });
