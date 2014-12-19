'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminRestrictionCtrl
 * @description
 * # AdminRestrictionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminRestrictionCtrl', function ($scope,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    adminOperations.getRestrictionFeeling().then(function(response) {
	   console.log(response);
	   $scope.res = {};
	  $scope.res.resend = response.data.Resend;
	  $scope.res.sameresend = response.data.ResendSame;
   });

    $scope.saveButtonClick = function(res){
    	console.log(res);
    	$scope.res = res;

	 adminOperations.addRestrictionFeeling($scope.res).then(function(response) {
	   console.log(response);
	   
	   adminOperations.getRestrictionFeeling().then(function(response) {
	   console.log(response);
	   $scope.res = {};
	  $scope.res.resend = response.data.Resend;
	  $scope.res.sameresend = response.data.ResendSame;
   });
	  
   });
    }
  });
