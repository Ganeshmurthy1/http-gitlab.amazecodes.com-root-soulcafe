'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MobileVerifyCtrl
 * @description
 * # MobileVerifyCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MobileVerifyCtrl', function ($scope, regService, $location, localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.mobileVerify = function() {
    	var authData = localStorageService.get('authorizationData');
    	var phn = new Object();
    	phn.user_id = authData.user_id;
    	phn.act_code = $scope.act_code;
    	  regService.VerifyMobile(phn).then(function(response) {
    		  if (response.data == 'true') {
    			  $location.path('/quiz');
    			  
    			  
  			}
    		  else {
    			  $scope.errMessage = response.data;
    		  }

                  $scope.savedSuccessfully = true;
                  $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                 });
      };
  });
