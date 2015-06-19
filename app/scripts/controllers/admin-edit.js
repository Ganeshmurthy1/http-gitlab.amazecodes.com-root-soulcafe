'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminEditCtrl
 * @description
 * # AdminEditCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminEditCtrl', function ($scope,$routeParams,adminOperations, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.id=$routeParams.id;

    adminOperations.getAdminData($scope.id).then(function (response) {
			$scope.admin=response.data[0];
		});


    $scope.editAdmin=function(){
    	 adminOperations.updateAdminData($scope.admin).then(function (response) {
    		 if (response.data == 'true') {
     			  $scope.savedSuccessfully = true;
                   $scope.successmessage = "Admin Edited sucessfully.";
                   $scope.errMessage = false;
                   $scope.discussion = false;
                   $scope.Forums = [];
                   $location.path('admin-edit');
     		  }
     		  else {
     			  $scope.successmessage = false;
     			  $scope.errMessage = response.data;
     		  }
		});

    };
  });
