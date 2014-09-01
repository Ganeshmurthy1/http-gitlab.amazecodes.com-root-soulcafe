'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeaderCtrl', function ($scope,$location) {

$scope.Header = 'views/header.html';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];




$scope.discussion=function()
{
	$location.path('/discussion-list');
}



  });
