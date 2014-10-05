'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MyMessagesCtrl
 * @description
 * # MyMessagesCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MyMessagesCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.getMyMessage().then(function (response) {
			//console.log(response);
			 $scope.comments = response.data;
		});
    }
    
    loadAllMessage();
  });
