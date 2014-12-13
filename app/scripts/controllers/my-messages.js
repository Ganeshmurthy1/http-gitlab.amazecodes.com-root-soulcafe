'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MyMessagesCtrl
 * @description
 * # MyMessagesCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MyMessagesCtrl', function ($scope, adminOperations,config,localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    function loadAllMessage() {
	    adminOperations.getMyMessage().then(function (response) {
			//console.log(response);
			 $scope.comments = response.data;
		});
    }
    
    loadAllMessage();
  });
