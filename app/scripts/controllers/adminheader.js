'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminheaderCtrl
 * @description
 * # AdminheaderCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminheaderCtrl', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.Header = 'views/admin-header.html';
    
	$scope.home=function(){
		$location.path('/superadmin-profile');
	}	
  });
