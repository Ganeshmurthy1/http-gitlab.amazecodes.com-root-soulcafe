'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MainCtrl', function ($scope, $rootScope, $facebook, regService, localStorageService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    $scope.login = function() {
      $facebook.login().then(function() {
    	//  makePromiseWithSon();
        refresh();
        
      });
    };
    function validateUser(param) {
    	
    	var result = new Object();
	    result.status = true;
	    result.message = '';
	    if (param.total_friends < 80) {
	    	result.status = false;
		    result.message = 'You dont have enough friends in your facebook profile';
		}	    
	    if (param.relationship_status == 'Married' || param.relationship_status == 'In a relationship' || param.relationship_status == 'Engaged' || param.relationship_status == 'In an open relationship' || param.relationship_status == 'Its complicated') {
	    	result.status = false;
		    result.message = 'Your Relationship status is not suitable for an account in Soulcafe';
		}
	    var d1 = new Date(param.birthday);
    	var d2 = new Date();
		var diff = d2.getFullYear()-d1.getFullYear();
	    if (param.gender == 'male') {
	    	if (diff < 22) {
	    		result.status = false;
			    result.message = 'You have to be above 24 years old to register in soulcafe';				
			}
			
		}
	    if (param.gender == 'female') {
	    	if (diff < 22) {
	    		result.status = false;
			    result.message = 'You have to be above 22 years old to register in soulcafe';				
			}
			
		}
	    
    	return result;
    	
    }
    function refresh() {
      $facebook.api('/me').then( 
        function(response) {
          $scope.welcomeMsg = 'Welcome ' + response.name;
          regService.getFbUserStatus(response).then(function (results) {  
          console.log(results.data);  	        
	        if (results.data != 'false') { //login 
				console.log('login');
				localStorageService.set('authorizationData', {
	                fb_id: response.id,
	                user_id: results.data.user_id,
	                userName: response.first_name
	            });
				var authData = localStorageService.get('authorizationData');
				console.log(authData);
				//$scope.loggedin = true;

				$location.path('/dashboard');
				 $rootScope.loggedin = true;
			}
	        else {// register//	        	        	
	        		regService.getFbFriendsCount().then(function(data) {
	                console.log(data);
	                response.total_friends = data.summary.total_count;
	                var res = validateUser(response);
	                if (res.status) {
	                	 $scope.fbdata = response;
	                	 localStorageService.set('facebookData', {fbdata:response});
	                     //  var fbbbbdata = localStorageService.get('facebookData');
						 // console.log(fbbbbdata);
						  $location.path('/signup');
	                	 if(response.gender == 'male') {
	                		 $scope.male = true;
	                	 } else {
	                		 $scope.female = true;
	                	 }
	                     $rootScope.isLoggedIn = true;

					}
	                else {
	                	localStorageService.set('signupDeniedMessage', res);
	                	$location.path('/signup-denied');
	                }
	                
	                
	                
	            });
	        }
  	    });
          
        });

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
  			                userName: response.first_name
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
    
   
    //refresh();
    
  });
