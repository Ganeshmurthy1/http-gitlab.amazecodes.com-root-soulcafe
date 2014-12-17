'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AddForumCtrl
 * @description
 * # AddForumCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AddForumCtrl', function ($scope, $location, regService, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.addDiscussion = function() {
    	console.log($scope.discussion);
    	regService.addUserDiscussion($scope.discussion).then(function(response) {
		  console.log(response);
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              //alert("The Forum will be posted soon after review.");
              //$location.path('/discussion-list');
              $location.url('/discussion-list?abm=1' );
              
              $scope.errMessage = false;
              $scope.discussion = false;
		  }
		  else {
			  $scope.successmessage = false;
			  $scope.errMessage = response.data;
		  }
       });


    };
  });
