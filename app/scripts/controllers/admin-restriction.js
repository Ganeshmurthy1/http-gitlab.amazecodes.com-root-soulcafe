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
	   $scope.res = {};
	   $scope.res.resend = response.data.Resend;
	   $scope.res.sameresend = response.data.ResendSame;
    });

    $scope.saveButtonClick = function(res){
    	$scope.res = res;

	 adminOperations.addRestrictionFeeling($scope.res).then(function(response) {	   
	   adminOperations.getRestrictionFeeling().then(function(response) {
  	   $scope.res = {};
  	   $scope.res.resend = response.data.Resend;
  	   $scope.res.sameresend = response.data.ResendSame;
      });
	  
   });
    }
  });
