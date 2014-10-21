'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SystemMessagesCtrl
 * @description
 * # SystemMessagesCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SystemMessagesCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadAllMessage() {
	    adminOperations.getSysMessage().then(function (response) {
			//console.log(response);
			 $scope.comments = response.data;
		});
    }
    
    loadAllMessage();
  });
