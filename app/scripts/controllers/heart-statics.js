'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeartStaticsCtrl
 * @description
 * # HeartStaticsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeartStaticsCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    adminOperations.heartStatics().then(function(response) {
		  console.log(response.data);
		  $scope.statics = response.data;
	});

  });
