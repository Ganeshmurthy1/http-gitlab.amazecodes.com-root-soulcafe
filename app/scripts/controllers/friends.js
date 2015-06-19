'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:FriendsCtrl
 * @description
 * # FriendsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('FriendsCtrl', function ($scope,$routeParams, $location, profileOperations,config,localStorageService,messageCodes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    $scope.q = '';
    var q = $routeParams.q;
    if (q != null) {
      $scope.q = messageCodes.Messages[q];
  }
    $scope.status = $routeParams.status;
    profileOperations.getBuddiesAll().then(function(response) {    
         $scope.friends=response.data;
          console.log($scope.friends);
     });
  });
