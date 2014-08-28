'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionListCtrl
 * @description
 * # DiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionListCtrl', function ($scope,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  //   $scope.userData = {};
  //   function getUSerdata() {
  //   	var authData = localStorageService.get('authorizationData');
  //   	// console.log(authData);
  //   	regService.getUserDetails(authData.user_id).then(function (results) {
  //   		// console.log(results.data);
  //   		$scope.userData = results.data; 
  //   		console.log($scope.userData.birthdate);
  //   		 var d1 = new Date($scope.userData.birthdate);
  // console.log($scope.userData.birthdate);
  //   	var d2 = new Date();
		// var diff = d2.getFullYear()-d1.getFullYear();
		// console.log(diff);	
  //   	});
    
  //     }
  //    getUSerdata();
    	

 
  });
