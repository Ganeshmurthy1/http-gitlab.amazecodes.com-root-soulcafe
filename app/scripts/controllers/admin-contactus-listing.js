'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminContactusListingCtrl
 * @description
 * # AdminContactusListingCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminContactusListingCtrl', function ($scope,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    adminOperations.getContactUs().then(function(response) {
  		console.log(response);
  		$scope.cnct = response.data;
  		console.log($scope.cnct);
    });
  });
