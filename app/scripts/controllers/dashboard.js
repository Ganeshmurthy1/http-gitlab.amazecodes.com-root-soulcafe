'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DashboardCtrl', function ($scope, $location, localStorageService, regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    

    function getUSerdata() {
    	var authData = localStorageService.get('authorizationData');
    	console.log(authData.user_id);
    	regService.getUserDetails(authData.user_id).then(function (results) {
    		//console.log(results.data);
    		$scope.userData = results.data; 

         if ($scope.userData.linked_update == 1){
           console.log("Abhik");
          regService.getLinkedinUserDetails($scope.userData.user_id).then(function (results) {
            // console.log(results.data);
            $scope.linkedinData = results.data;
             console.log($scope.linkedinData);
          });
      
        }   	
    	});
     
      }
    
    getUSerdata();

     $scope.updateWithLinkedin = function() {
      $location.path('/linkedin');
    };
  });
