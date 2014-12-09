'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:FriendsCtrl
 * @description
 * # FriendsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('FriendsCtrl', function ($scope,profileOperations,config,localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    profileOperations.getBuddiesAll().then(function(response) {
      
      console.log(response);    
         $scope.friends=response.data;
       // if($scope.friends.UpdatedPicture == null){
       //    $scope.friends.pict = $scope.userData.Picture;
       //    localStorageService.set('fbpicture', {fbpicture:$scope.pict});
       //  }else{
       //    $scope.friends.pict = $scope.imagepath + $scope.userData.UpdatedPicture;
       //    console.log($scope.pict);
       //    localStorageService.set('fbpicture', {fbpicture:$scope.pict});
       //  }
     });
  });
