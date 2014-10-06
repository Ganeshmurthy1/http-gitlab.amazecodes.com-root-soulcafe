'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminAddAdminCtrl
 * @description
 * # SuperadminAddAdminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminAddAdminCtrl', function ($scope, adminOperations, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.adminAddAdmin = function() {

    	$scope.discussion.frs = $scope.Forums;
        console.log($scope.discussion);
        adminOperations.addAdmin($scope.discussion).then(function(response) {
  		  console.log(response);
  		  if (response.data == 'true') {
  			  $scope.savedSuccessfully = true;
                $scope.successmessage = "Admin added sucessfully.";
                $scope.errMessage = false;
                $scope.discussion = false;
                $scope.Forums = [];
                $location.path('superadmin-add-admin');
  		  }
  		  else {
  			  $scope.successmessage = false;
  			  $scope.errMessage = response.data;
  		  }
         });
        
        console.log( $scope.Forums);

    };
    $scope.Forums= [];
    $scope.AddForum = function(id) {  
    	 console.log(id);
    	 $scope.Forums.push(id);
    	 
    	 
    	 
    	 console.log( $scope.Forums);
    };
    
    function loadAllForum() {
	    adminOperations.getAllForum().then(function (response) {
			//console.log(response);
			$scope.forums = response.data;
	    	$scope.checkboxes = [
	    	                     {"text": "text1", checked:false},
	    	                     {"text": "text2", checked:false},
	    	                     {"text": "text3", checked:false},
	    	                     {"text": "text4", checked:false}
	    	                 ];
		});
    }
    
    loadAllForum();
    
  });
