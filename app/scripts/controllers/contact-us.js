'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ContactUsCtrl
 * @description
 * # ContactUsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ContactUsCtrl', function ($scope,regService,messageCodes, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    $scope.cnctUs = function(){
    	console.log($scope.cnct);
    	regService.addContact($scope.cnct).then(function(response) {
  		  if (response.data == 'true') {
  			 $scope.q = '';
    var q = 115;
    if (q != null) {
      $scope.q = messageCodes.Messages[q];
  }
  		  }
  		  else {
  			  
  		  }
         });
    }
  });
