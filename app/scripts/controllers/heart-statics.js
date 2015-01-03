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

    $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat:'yy-mm-dd',
            
        };

    adminOperations.heartStatics().then(function(response) {
		  console.log(response.data);
		  $scope.statics = response.data;
	});

    $scope.search = function (a){
      console.log(a.from);
      adminOperations.searchHeartStatics(a).then(function(response) {
      console.log(response.data);
       $scope.statics = response.data;
  });

    }

  });
