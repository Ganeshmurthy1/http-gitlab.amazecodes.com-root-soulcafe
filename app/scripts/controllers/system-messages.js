'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SystemMessagesCtrl
 * @description
 * # SystemMessagesCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SystemMessagesCtrl', function ($scope, adminOperations, localStorageService, config) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
    function loadAllMessage() {
	    adminOperations.getSysMessage().then(function (response) {
			 $scope.comments = response.data;
      
		});
    }
    
    loadAllMessage();
  });
