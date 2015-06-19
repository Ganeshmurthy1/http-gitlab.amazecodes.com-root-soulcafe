'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminDiscussionboardabuseListCtrl
 * @description
 * # AdminDiscussionboardabuseListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminDiscussionboardabuseListCtrl', function ($scope, adminDiscussion,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.action="true";

    adminDiscussion.adminAbuseList().then(function (response) {
	    $scope.disscusionAbuseDetails = response.data;
	  });


    $scope.appropriateButtonClick = function(commentId){
    	 adminDiscussion.updateAppropriate(commentId).then(function (response) {
          
	    	});

    }
    

    $scope.inappropriateButtonClick = function(commentId){
    	  adminDiscussion.updateInAppropriate(commentId).then(function (response) {
            adminDiscussion.adminAbuseList().then(function (response) {
              $scope.disscusionAbuseDetails = response.data;
            });
        });

    }
 });
