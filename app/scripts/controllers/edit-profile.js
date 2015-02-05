'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditProfileCtrl
 * @description
 * # EditProfileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditProfileCtrl', function ($scope,regService,$location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

  regService.getProfileDetail().then(function (response) {
         $scope.profileDetail = response.data;
      });


  $scope.saveButtonClick = function(){
  	regService.updateProfileDetail($scope.profileDetail).then(function (response) {
         if(response.data == "true"){
         	 $location.path("dashboard");
         }
      });
  }
  });
