'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DashboardAnonCtrl
 * @description
 * # DashboardAnonCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DashboardAnonCtrl', function ($scope, $location, localStorageService, regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    $scope.updateButton = 'false';

    function getUSerdata() {
    	var authData = localStorageService.get('authorizationData');
    	
     
    	regService.getUserDetails(authData.user_id).then(function (results) {
    		//console.log(results.data);
    		$scope.userData = results.data; 
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

    //  $scope.updateWithLinkedin = function() {
    //   console.log("AAAAAAAAAAAAAAAAAAAA");
    //   $location.path('/linkedin');
    // };

    // console.log("graph.facebook.com/"+authData.fb_id+"/picture");
  });
// var authData = localStorageService.get('authorizationData');
                