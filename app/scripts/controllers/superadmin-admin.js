'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminAdminCtrl
 * @description
 * # SuperadminAdminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminAdminCtrl', function ($scope,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    adminOperations.getAllAdmins().then(function (response) {
			console.log(response.data);
			$scope.admins = response.data;

			// for(var ad in $scope.admins){
			// 	console.log("Aaaaaa");
			// 	console.log($scope.admins[ad].Status);
			// 	// $scope.a = $scope.admins[ad].Status;
			// 	// if($scope.admins[ad].Status = 0){
			// 	// 	console.log("Inside If");
			// 	// 	$scope.admins[ad].activate = 'true';
			// 	// }else if($scope.admins[ad].Status = 1){
			// 	// 	console.log("Inside Else");
			// 	// 	$scope.admins[ad].activate = 'false';
			// 	// }
			// }
			// console.log($scope.admins);
		});
  });
