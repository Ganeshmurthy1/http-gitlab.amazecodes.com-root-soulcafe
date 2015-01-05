'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminCtrl', function ($scope, adminOperations, localStorageService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.signIn = function() {
    	adminOperations.signIn($scope.fbdata).then(function(response) {
		  if (response.data == 'Status') {
		  	alert ("Your account is deactive please contact Customer Care.");
		  }else if (response.data != 'false') {
			  localStorageService.set('authorizationData', {
	                user_id: response.data.AdminId,
	                userName: response.data.FullName,
	                token: response.data.token,
	                user_role: "1",
	                admin_role:response.data.Role
	            });
				
				// JS authentication
				var accessLevels = routingConfig.accessLevels
		        , userRoles = routingConfig.userRoles;
				localStorageService.set('user', {
					 username: response.data.first_name,
					 role: userRoles.admin
		         });
				$location.path('/superadmin-profile');
				
				
		  }
		  else {
			  $scope.successmessage = false;
			  $scope.errMessage = 'Username or Password Incorrect';
		  }
       });


    };
  });
