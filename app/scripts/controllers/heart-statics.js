'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeartStaticsCtrl
 * @description
 * # HeartStaticsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeartStaticsCtrl', function ($scope, adminOperations, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat:'yy-mm-dd',
            
        };

    adminOperations.heartStatics().then(function(response) {
		  $scope.statics = response.data;
	});

    $scope.search = function (a){
      adminOperations.searchHeartStatics(a).then(function(response) {
       $scope.statics = response.data;
  });

    }

  });
