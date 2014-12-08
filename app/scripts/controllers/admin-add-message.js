'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminAddMessageCtrl
 * @description
 * # AdminAddMessageCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminAddMessageCtrl', function ($scope, adminOperations, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if ($routeParams.user_id) {
    	$scope.message = {};    	   
        $scope.message.to = $routeParams.user_id;
	}
    
    
    $scope.getLocation = function(val) {
    
    	 return adminOperations.adminGetThisUser(val).then(function (response) {
    		 return response.data.map(function(item){
    	          return item.first_name;
    	        });
 		});    	 

    };
    
    
    $scope.adminAddMessage = function() {

    	adminOperations.addAdminMessage($scope.message).then(function(response) {
		  console.log(response);
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              $scope.successmessage = "Message sent sucessfully.";
              $scope.errMessage = false;
              $scope.message = false;
		  }
		  else {
			  $scope.successmessage = false;
			  $scope.errMessage = response.data;
		  }
       });


    };

  });