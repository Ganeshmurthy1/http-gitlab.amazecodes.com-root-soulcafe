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




    adminDiscussion.adminAbuseList().then(function (response) {
	    		console.log(response);
	    		$scope.disscusionAbuseDetails = response.data;
	    	});


    $scope.appropriateButtonClick = function(commentId){
    	console.log(commentId);

    	  adminDiscussion.updateAppropriate(commentId).then(function (response) {
	    	 	console.log(response);
	    	});

    }
    

    $scope.inappropriateButtonClick = function(commentId){
    	console.log(commentId);

    	  adminDiscussion.updateInAppropriate(commentId).then(function (response) {
	    	 	console.log(response);
          
            adminDiscussion.adminAbuseList().then(function (response) {
          console.log(response);
          $scope.disscusionAbuseDetails = response.data;
        });
          
	    	});

    }

    // $scope.viewButtonClick = function(){
    // 	$location.path("discussion");
    // }



    
  });
