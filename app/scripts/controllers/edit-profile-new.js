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
		    api_key: "78vemb3hk2l6at",
		    credentials_cookie: true
		    });
		});	
	}



     regService.getProfileDetail().then(function (response) {
         console.log(response);
         $scope.profileDetail = response.data;
         if ($scope.profileDetail.linked_update == 0) {
         	$scope.disable = 'true';
         }else{
         	$scope.disable = 'false';
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
