'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditProfileOtherCtrl
 * @description
 * # EditProfileOtherCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditProfileOtherCtrl', function ($scope,$routeParams,regService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false,
    isSecondOpen:true
  };

    $scope.user_id = $routeParams.user_id;
    regService.getProfileDetailOther($scope.user_id).then(function (response) {
         $scope.profileDetail = response.data;
         $scope.userData = response.data;
      });
 });

