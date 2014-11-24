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
   $rootScope.a=true;
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
	    if (param.total_friends < 20) {
	    	result.status = false;
		    result.message = 'You dont have enough friends in your facebook profile';
		}	 
	   // param.relationship_status = param.relationship_status.replace(/'/g, "\\'");
	    console.log(param.relationship_status);
	    if (param.relationship_status == 'Married' || param.relationship_status == 'In a relationship' || param.relationship_status == 'Engaged' || param.relationship_status == 'In an open relationship' || param.relationship_status == 'It\'s complicated' || param.relationship_status == 'In a civil union') {
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
	        if (results.data.status == 1) { //login 
				console.log('login');
				$facebook.api("/me/picture?redirect=0&height=200&type=normal&width=200").then(function(pic) {
				      	console.log(pic);
				  		$scope.fbpicture = pic;
					  localStorageService.set('fbpicture', {fbpicture:pic});
					 //   var fbbbbdata = localStorageService.get('fbpicture');
						// console.log(fbbbbdata);
				  });
				localStorageService.set('authorizationData', {
	                fb_id: response.id,
	                user_id: results.data.user_id,
	                userName: response.first_name,
	                lastName: response.last_name,
	                token: results.data.token,
	                user_role: results.data.user_role	                
	            });
	            
				
				// JS authentication
				var accessLevels = routingConfig.accessLevels
		        , userRoles = routingConfig.userRoles;
				localStorageService.set('user', {
					 username: response.first_name,
					 role: userRoles.user
		         });
				var authData = localStorageService.get('authorizationData');
				console.log(authData);
				//$scope.loggedin = true;
				$location.path('/quiz');
				 $rootScope.loggedin = true;
			}else if(results.data.status == 0){
				$rootScope.abc = "Your account is not active. Please contact Customer Care.";
				$rootScope.a=false;
				console.log($scope.abc);
				console.log($scope.a);
			}else {// register//	        	        	
	        		regService.getFbFriendsCount().then(function(data) {
	                console.log(data);
	                response.total_friends = data.summary.total_count;
	                var res = validateUser(response);
	                if (res.status) {
	                	 $scope.fbdata = response;
	                	 localStorageService.set('facebookData', {fbdata:response});

				 $facebook.api("/me/picture?redirect=0&height=200&type=normal&width=200").then(function(pic) {
				      	console.log(pic);
				       	$scope.fbpicture = pic;
					    localStorageService.set('fbpicture', {fbpicture:pic});
					   var fbbbbdata = localStorageService.get('fbpicture');
						console.log(fbbbbdata);
				  });

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
	                	// $location.path('/signup-denied');
	                	var deniedMessage = localStorageService.get('signupDeniedMessage');
    					$scope.message = deniedMessage.message;
	                	alert("Sorry you are not qualified for an account in Soulcafe , " +$scope.message);
	                }
	                
	                
	                
	            });
	        }
  	    });
          
        });

    }
    

    
   
    //refresh();
    
  });
