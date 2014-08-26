'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SignupCtrl', function ($scope,$rootScope,$location,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log("Abhikkkk");
    var data = localStorageService.get('facebookData');
	console.log(data.fbdata);
	$scope.fbdata = data.fbdata;
	console.log($scope.fbdata);
	if($scope.fbdata.gender == 'male') {
	     $scope.male = true;
	} else {
	$scope.female = true;
	}

 $scope.signUp = function() {

    if($scope.fbdata.id == null){
    	$scope.errMessage = "Login with Facebook";
    }
    else{
  	  regService.registerUser($scope.fbdata).then(function(response) {
  		  console.log(response);
  		  if (response.data == 'true') {
  			  console.log('success');
  			  regService.getFbUserStatus($scope.fbdata).then(function (results) {
  				  console.log(results.data);
  				  if (results.data != 'false') { //login 
  						console.log('login');
  						localStorageService.set('authorizationData', {
  			                fb_id: $scope.fbdata.id,
  			                user_id: results.data.user_id,
  			                userName: response.first_name,
  			                token: results.data.token
  			            });
  						var accessLevels = routingConfig.accessLevels
  				        , userRoles = routingConfig.userRoles;
  						localStorageService.set('user', {
  							 username: response.first_name,
  							 role: userRoles.user
  				         });
  						var authData = localStorageService.get('authorizationData');
  		  				console.log(authData);
  		  				//$scope.loggedin= true;
  		  				$rootScope.loggedin = true;
					   
					  		  				// $location.path('/mobile-verify');
  		  				 $location.path('/dashboard');
  					}
  				  
  			  });
  			  
			}
  		  else {
  			  $scope.errMessage = response.data;
  		  }

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                // startTimer();

            });
		}
    };














  });
