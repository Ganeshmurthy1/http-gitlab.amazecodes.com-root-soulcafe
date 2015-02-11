'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MainCtrl', function ($scope, $rootScope, $facebook, regService, localStorageService, $location, $modal, $log, config, Angularytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.click = function() {
        Angularytics.trackEvent("Home Category", "Button clicked");
    }

    config.setConfigruation();
    
    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $rootScope.a=true;
    $scope.login = function() {
      $facebook.login().then(function() {
        refresh();
        
      });
    };
    function validateUser(param) {
    	
    	var result = new Object();
	    result.status = true;
	    result.message = '';
	    if (param.total_friends < 20) {
	    	result.status = false;
		    result.message = 'Oopsie! Your facebook profile failed our social validation criteria.';
		}	 
	    if (param.relationship_status == 'Married' || param.relationship_status == 'In a relationship' || param.relationship_status == 'Engaged' || param.relationship_status == 'In an open relationship' || param.relationship_status == 'It\'s complicated' || param.relationship_status == 'In a civil union') {
	    	result.status = false;
		    result.message = 'Oopsie! Your social profile shows you are already in a relationship. ';
		}
	    var d1 = new Date(param.birthday);
    	var d2 = new Date();
		var diff = d2.getFullYear()-d1.getFullYear();
	    if (param.gender == 'male') {
	    	if (diff < 22) {
	    		result.status = false;
			    result.message = 'Oops! Your social profile suggests you are below our minimum eligible age.';				
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
          
	        if (results.data.status == 1) { //login 
				regService.getPicture(results.data.user_id).then(function(response) {
			        
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
			                Moto:response.data.Moto,
			                Gender: response.data.gender
		            });
		            var fbbbbdata = localStorageService.get('authorizationData');
		
					
					// JS authentication
					var accessLevels = routingConfig.accessLevels
			        , userRoles = routingConfig.userRoles;
					localStorageService.set('user', {
						 username: response.first_name,
						 role: userRoles.user
			         });
					var authData = localStorageService.get('authorizationData');
					
					$location.path('/' + results.data.redirection);
					$rootScope.loggedin = true;
			        
			        
				});
				
			}else if(results.data.status == 0){
				$rootScope.abc = "Your account is not active. Please contact Customer Care.";
				$rootScope.a=false;
				
			}else {// register//	        	        	
	        		regService.getFbFriendsCount().then(function(data) {
	                
	                response.total_friends = data.summary.total_count;
	                var res = validateUser(response);
	                if (res.status) {
	                	 $scope.fbdata = response;
	                	 localStorageService.set('facebookData', {fbdata:response});

					 $facebook.api("/me/picture?redirect=0&height=200&type=normal&width=200").then(function(pic) {
					      	
					       	$scope.fbpicture = pic;
						    localStorageService.set('fbpicture', {fbpicture:pic});
						   var fbbbbdata = localStorageService.get('fbpicture');
							
						   $scope.open();
							
					  });
						 
	                	 if(response.gender == 'male') {
	                		 $scope.male = true;
	                	 } else {
	                		 $scope.female = true;
	                	 }
	                     $rootScope.isLoggedIn = true;

					}
	                else {
	                	localStorageService.set('signupDeniedMessage', res);
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


     $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    
    
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open1 = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myLoginContent.html',
      controller: 'LoginInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
    
    
  });
	angular.module('sassApp')
.controller('ModalInstanceCtrl', function (config, $scope, $rootScope, $facebook, regService, localStorageService, $location, $modalInstance, items) {

	
    
    config.setConfigruation();
    
    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



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
	    
	    //Hide profile validation
	    return result;
	    
	    if (param.total_friends < 20) {
	    	result.status = false;
		    result.message = 'You dont have enough friends in your facebook profile';
		}	 
	   // param.relationship_status = param.relationship_status.replace(/'/g, "\\'");
	    //console.log(param.relationship_status);
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
              	        
            
  	        if (results.data.status == 1) { //login 
  				
  				regService.getPicture(results.data.user_id).then(function(response) {
  			        
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
  			                Moto:response.data.Moto,
  			                Gender: response.data.gender
  		            });
  		            var fbbbbdata = localStorageService.get('authorizationData');

  					
  					// JS authentication
  					var accessLevels = routingConfig.accessLevels
  			        , userRoles = routingConfig.userRoles;
  					localStorageService.set('user', {
  						 username: response.first_name,
  						 role: userRoles.user
  			         });
  					var authData = localStorageService.get('authorizationData');
  					
  					$location.path('/quiz');
  					$rootScope.loggedin = true;
  			        
  			        
  				});
  				
  			}else if(results.data.status == 0){
  				$rootScope.abc = "Your account is not active. Please contact Customer Care.";
  				$rootScope.a=false;
  			}else {// register//	        	        	
  	        		regService.getFbFriendsCount().then(function(data) {
  	                response.total_friends = data.summary.total_count;
  	                var res = validateUser(response);
  	                if (res.status) {
  	                	 $scope.fbdata = response;
  	                	 localStorageService.set('facebookData', {fbdata:response});

  					 $facebook.api("/me/picture?redirect=0&height=200&type=normal&width=200").then(function(pic) {
  					      
  					       	$scope.fbpicture = pic;
  						    localStorageService.set('fbpicture', {fbpicture:pic});
  						   var fbbbbdata = localStorageService.get('fbpicture');
  							
  							 $location.path('/signup');
  					  });
  						 
  	                	 if(response.gender == 'male') {
  	                		 $scope.male = true;
  	                	 } else {
  	                		 $scope.female = true;
  	                	 }
  	                     $rootScope.isLoggedIn = true;

  					}
  	                else {
  	                	localStorageService.set('signupDeniedMessage', res);
  	                	var deniedMessage = localStorageService.get('signupDeniedMessage');
      					$scope.message = deniedMessage.message;
  	                	alert("Sorry you are not qualified for an account in Soulcafe , " +$scope.message);
  	                }
  	                
  	                
  	                
  	            });
  	        }
    	    });
            
          });
  		$modalInstance.close();
      }

    
});

angular.module('sassApp')
.controller('LoginInstanceCtrl', function (config, $scope, $rootScope, $facebook, regService, localStorageService, $location, $modalInstance, items, $modal, $log) {

  
    
    config.setConfigruation();
    
    $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



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
      
      //Hide profile validation
      return result;
      
      if (param.total_friends < 20) {
        result.status = false;
        result.message = 'You dont have enough friends in your facebook profile';
    }  
     // param.relationship_status = param.relationship_status.replace(/'/g, "\\'");
      //console.log(param.relationship_status);
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
          
          if (results.data.status == 1) { //login 
        regService.getPicture(results.data.user_id).then(function(response) {
              
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
                      Moto:response.data.Moto,
                      Gender: response.data.gender
                });
                var fbbbbdata = localStorageService.get('authorizationData');
    
          
          // JS authentication
          var accessLevels = routingConfig.accessLevels
              , userRoles = routingConfig.userRoles;
          localStorageService.set('user', {
             username: response.first_name,
             role: userRoles.user
               });
          var authData = localStorageService.get('authorizationData');
          
          $location.path('/' + results.data.redirection);
          $rootScope.loggedin = true;
              
              
        });
        
      }else if(results.data.status == 0){
        $rootScope.abc = "Your account is not active. Please contact Customer Care.";
        $rootScope.a=false;
        
      }else {// register//                      
              regService.getFbFriendsCount().then(function(data) {
                  
                  response.total_friends = data.summary.total_count;
                  var res = validateUser(response);
                  if (res.status) {
                     $scope.fbdata = response;
                     localStorageService.set('facebookData', {fbdata:response});

           $facebook.api("/me/picture?redirect=0&height=200&type=normal&width=200").then(function(pic) {
                  
                  $scope.fbpicture = pic;
                localStorageService.set('fbpicture', {fbpicture:pic});
               var fbbbbdata = localStorageService.get('fbpicture');
              
               $scope.open();
              
            });
             
                     if(response.gender == 'male') {
                       $scope.male = true;
                     } else {
                       $scope.female = true;
                     }
                       $rootScope.isLoggedIn = true;

          }
                  else {
                    localStorageService.set('signupDeniedMessage', res);
                    var deniedMessage = localStorageService.get('signupDeniedMessage');
              $scope.message = deniedMessage.message;
                    alert("Sorry you are not qualified for an account in Soulcafe , " +$scope.message);
                  }
                  
                  
                  
              });
          }
        });
          
        });
    $modalInstance.close();
    }

    
});