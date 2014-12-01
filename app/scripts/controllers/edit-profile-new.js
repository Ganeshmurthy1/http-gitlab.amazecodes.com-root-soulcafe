'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditProfileNewCtrl
 * @description
 * # EditProfileNewCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditProfileNewCtrl', ['$scope','$rootScope','$location','linkedinService','localStorageService','regService','profileOperations', function ($scope, $rootScope, $location, linkedinService, localStorageService, regService,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    	var linkedinLibLoaded = false,
    linkedinLibInitialized = false;

	window.linkedinLibInit = function(){
	    linkedinLibInitialized = true;
	};	
	if(!$rootScope.linkedin){	
		$rootScope.linkedin = true;
		$.getScript("//platform.linkedin.com/in.js?async=true", function success() {
		IN.init({
		    onLoad: "onLinkedInLoad",
		    api_key: "75ckjn95bgi4uv",
		    credentials_cookie: true
		    });
		});	
	}



	 $scope.hideEdit='false';
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
        // console.log(results.data);
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



     regService.getProfileDetail().then(function (response) {
         console.log(response);
         $scope.profileDetail = response.data;
         if ($scope.profileDetail.linked_update == 1) {
          $scope.updateButton = 'true';
          $scope.disable = 'false';
          console.log($scope.disable);
         }else if ($scope.profileDetail.linked_update == 0) {
         	$scope.disable = 'true';
         }
      });


  $scope.saveButtonClick = function(){
  	console.log($scope.profileDetail);
  	
  	regService.updateProfileDetail($scope.profileDetail).then(function (response) {
         console.log(response);
         if(response.data == "true"){
         	 $location.path("home");
         }
      });
  }
  }]);
