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
			console.log(response);
			for ( var int = 0; int < response.data.length; int++) {
				var thisDate = response.data[int].AddedDate;
				var thisDateT = thisDate.substr(0, 10) + "T" + thisDate.substr(11, 8);
				response.data[int].adDate = new Date(thisDateT);
			}
			 $scope.comments = response.data;
		});
    }
    
    loadAllMessage();
  });
