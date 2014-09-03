'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditProfileCtrl
 * @description
 * # EditProfileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditProfileCtrl', function ($scope,regService,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  regService.getProfileDetail().then(function (response) {
         console.log(response);
         $scope.profileDetail = response.data;
      });


  $scope.saveButtonClick = function(){
  	console.log($scope.profileDetail);
  	regService.updateProfileDetail($scope.profileDetail).then(function (response) {
         console.log(response);
         if(response.data == "true"){
         	 $location.path("dashboard");
         }
      });
  }
  });
