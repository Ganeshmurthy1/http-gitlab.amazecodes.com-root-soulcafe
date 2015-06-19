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
      		$scope.userData = results.data; 
  	    	var d1 = new Date($scope.userData.birthdate);
  	    	var d2 = new Date();
			   $scope.diff = d2.getFullYear()-d1.getFullYear();
         if ($scope.userData.linked_update == 1){
           $scope.updateButton = 'true';
          regService.getLinkedinProffesionaldetails(authData.user_id).then(function(response) {
              $scope.proffesionalDetails = response;
          });
      
        }   	
    	});
     
      }
    
    getUSerdata();

    profileOperations.getBuddies().then(function(response) {
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
         $scope.totalfriends=$scope.friends.length;       
     });

   
  });
