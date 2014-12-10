'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the sassApp
 */
 

angular.module('sassApp')
  .controller('SideBarCtrl', function ($scope, localStorageService, regService, profileOperations,config) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.SideBar = 'views/side_bar.html';

    function getUSerdata() {
      var authData = localStorageService.get('authorizationData');
      console.log(authData);
     

//      });
     
      }
    
    getUSerdata();

    profileOperations.getBuddies().then(function(response) {
      
      console.log(response);    
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
          console.log($scope.discussion); 
          $scope.totalfriends=$scope.friends.length; 

       
     
     });

   
  });
