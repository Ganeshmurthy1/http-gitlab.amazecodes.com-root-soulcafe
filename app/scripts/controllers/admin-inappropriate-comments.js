'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminInappropriateCommentsCtrl
 * @description
 * # AdminInappropriateCommentsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminInappropriateCommentsCtrl', function ($scope,adminDiscussion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    adminDiscussion.adminInappropriateComment().then(function (response) {
	    		console.log(response);
	    		 $scope.comm = response.data;
	    	});

  });
