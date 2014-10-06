'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdDiscussionListCtrl
 * @description
 * # AdDiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdDiscussionListCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.adminGetMyForums().then(function (response) {
			console.log(response);
			 $scope.discussions = response.data;
		});
    }
    
    loadAllMessage();
  });
