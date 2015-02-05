'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AddForumCtrl
 * @description
 * # AddForumCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AddForumCtrl', function ($scope, $location, regService, $routeParams, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    $scope.addDiscussion = function() {
    	regService.addUserDiscussion($scope.discussion).then(function(response) {
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
        $location.url('/discussion-list?q=110' );
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
