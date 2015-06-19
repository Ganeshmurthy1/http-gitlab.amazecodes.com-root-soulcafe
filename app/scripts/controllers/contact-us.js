'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ContactUsCtrl
 * @description
 * # ContactUsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ContactUsCtrl', function ($scope,regService,messageCodes, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.q = '';
    var q = $routeParams.q;
    if (q != null) {
      // console.log(messageCodes.Messages[q]);
      $scope.q = messageCodes.Messages[q];
    }
    $scope.cnct = {};
    $scope.cnct.request='I have a suggestion';

    $scope.cnctUs = function(){

    	console.log($scope.cnct);
    	regService.addContact($scope.cnct).then(function(response) {
  		  if (response.data == 'true') {
          $location.url("/contact-us?q=115");
  		  }
  		  else {
  			  
  		  }
         });
    }
  });
