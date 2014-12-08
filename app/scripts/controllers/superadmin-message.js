'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminMessageCtrl
 * @description
 * # SuperadminMessageCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminMessageCtrl', function ($scope, adminOperations,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.adminGetAllMessage().then(function (response) {
			 console.log(response.data);
			 $scope.comm = response.data;
       console.log($scope.comm);
		});
    }
    
    loadAllMessage();


    $scope.viewUser = function(a){
      console.log(a);
      
      adminOperations.viewStatusAbuse(a.SenderId).then(function (response) {
      console.log(response.data);
       $location.url("/superadmin-view-user?userid="+a.UserId);
    });
    }
  });
