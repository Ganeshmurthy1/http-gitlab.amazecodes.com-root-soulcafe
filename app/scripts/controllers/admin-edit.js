'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminEditCtrl
 * @description
 * # AdminEditCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminEditCtrl', function ($scope,$routeParams,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.id=$routeParams.id;

    adminOperations.getAdminData($scope.id).then(function (response) {
			console.log(response);
			$scope.admin=response.data[0];
			console.log($scope.admin);
		});


    $scope.editAdmin=function(){
    	console.log("AAAAAaAAAAAAaaaa");
    	console.log($scope.admin); 
    	 adminOperations.updateAdminData($scope.admin).then(function (response) {
			console.log(response);
		});

    };
  });
