'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminProfileCtrl
 * @description
 * # SuperadminProfileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminProfileCtrl', function ($scope, adminOperations, localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var authData = localStorageService.get('authorizationData');
	console.log(authData);
  });
