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

    $scope.mobileVerified = false;
    $scope.mobileVerifiedMessage = false;
    $scope.submitted=false;
    console.log("Abhikkkk");
    var data = localStorageService.get('facebookData');
	// console.log(data.fbdata);
	$scope.fbdata = data.fbdata;
	// console.log($scope.fbdata);
   
	if($scope.fbdata.gender == 'male') {
	     $scope.male = true;
	} else {
	$scope.female = true;
	}
   var fbpic = localStorageService.get('fbpicture');
   $scope.fbdata.pic = fbpic.fbpicture;
   console.log($scope.fbdata);
   
   $scope.resendCode = function() {
	   console.log($scope.fbdata.mobile);
	   var phn = new Object();
	   	phn.mobile = $scope.fbdata.mobile;
	   	//phn.act_code = $scope.actcode;
	   
	   regService.resendActCode(phn).then(function(response) {
		   if (response.data == 'true') {
	   			 $scope.resMessage = true;
 			}
   		  else {
   			  $scope.errMobileMessage = response.data;
   		  }		   
	   });
   };
   
   $scope.mobileVerify = function() {
	$scope.errMessage = '';
	$scope.mobileVerifiedMessage = false;
   	var authData = localStorageService.get('authorizationData');
   	var phn = new Object();
   	phn.user_id = authData.user_id;
   	phn.act_code = $scope.actcode;
   	//console.log(phn);
   	  regService.VerifyMobile(phn).then(function(response) {
   		  console.log(response);
   		  if (response.data == 'true') {
   			regService.getPicture(authData.user_id).then(function(response) {
		        console.log(response.data);
		        var config = localStorageService.get('config');
		        $scope.imagepath = config.image_path;
		        if(response.data.Picture != null){
		        	 $scope.pict = $scope.imagepath + response.data.Picture;
		          console.log($scope.pict);
		          localStorageService.set('fbpicture', {fbpicture:$scope.pict});
		        }
   			  console.log('success');
   			  $location.path('/quiz');
   			});  
   			  
 			}
   		  else {
   			  $scope.errMobileMessage = response.data;
   		  }

                 $scope.savedSuccessfully = true;
                 $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                 // startTimer();

             });
     };
   
 $scope.signUp = function() {
      console.log("Abhik1");
    if($scope.fbdata.id == null){
    	$scope.errMessage = "Login with Facebook";
    }
    else{
      //console.log($scope.fbdata); 
  	  regService.registerUser($scope.fbdata).then(function(response) {
  		  console.log(response);
  		  if (response.data == 'true') {
  			  console.log('success');
  			  regService.getFbUserStatus($scope.fbdata).then(function (results) {
  				  console.log(results.data);
  				  if (results.data != 'false') { //login 
  						console.log('login');
  						regService.getPicture(results.data.user_id).then(function(response) {
  					        console.log(response.data);
  					        var config = localStorageService.get('config');
  					        $scope.imagepath = config.image_path;
  					        if(response.data.Picture != null){
  					        	 var pict = $scope.imagepath + response.data.Picture;
  					          
  					        }
  					      localStorageService.set('authorizationData', {
  					    	fb_id: results.data.id,
  			                user_id: results.data.user_id,
  			                first_name: results.data.first_name,
  			                last_name: results.data.last_name,
  			                token: results.data.token,
  			                user_role: results.data.user_role,
  			                picture: pict,
  			                linked_update : response.data.linked_update,
  			                employment : response.data.CurrentEmployment,
  			                location: response.data.location,
  			                birthdate:response.data.birthdate,
  			                Moto:response.data.Moto                
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
    		  				$scope.actcode = '';
    		  				$scope.mobileVerified = true;
    		  				$scope.mobileVerifiedMessage = true;
    		  				$scope.errMessage = '';
  			   			  
  			   			});  
  						
  						
  						
					  	  //$location.path('/mobile-verify');
  		  				  // $location.path('/dashboard');
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


     $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();
  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
$scope.format={ };
  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['MM/dd/yyyy','yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];




  });
