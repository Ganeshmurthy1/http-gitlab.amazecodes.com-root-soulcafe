'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminContactusDetailCtrl
 * @description
 * # AdminContactusDetailCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminContactusDetailCtrl', function ($scope,$routeParams,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.id = $routeParams.id;
    console.log($scope.id);
     adminOperations.getContactDetail($scope.id).then(function(response) {
  		console.log(response);
  		 $scope.cnctdetail = response.data;
  		// console.log($scope.cnctdetail);
    });
  });
