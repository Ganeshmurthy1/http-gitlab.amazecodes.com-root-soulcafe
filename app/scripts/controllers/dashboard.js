'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, $location, linkedinService, localStorageService, regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 $scope.updateButton = 'false';
    $scope.getUserProfile = function () {
         
        linkedinService.getProfile(function(err, result){
            if(err){
                console.log('error occured');
            }else{
                console.log('result', result);
                $scope.linkedinData = result;
               regService.addLinkedinDataf($scope.linkedinData).then(function(response) {
                  // console.log(response.data);
                  if (response.data == 'true') {
                    console.log('success'); 
                    // $location.path('/dashboard');
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
                  else {
                    console.log('failed');
                  }
                });

            }
        });
    };

   

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
                