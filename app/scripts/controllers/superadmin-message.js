'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminMessageCtrl
 * @description
 * # SuperadminMessageCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminMessageCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.adminGetAllMessage().then(function (response) {
			console.log(response);
			 $scope.comm = response.data;
		});
    }
    
    loadAllMessage();
  });
