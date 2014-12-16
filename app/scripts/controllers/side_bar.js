'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the sassApp
 */
 

angular.module('sassApp')
  .controller('SideBarCtrl', function ($scope, localStorageService, regService, profileOperations,config, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.SideBar = 'views/side_bar.html';
    
    
    $scope.sideData = localStorageService.get('authorizationData');
    //console.log($scope.sideData); 
    var d1 = new Date($scope.sideData.birthdate);
    var d2 = new Date();
    $scope.diff = d2.getFullYear()-d1.getFullYear();


    profileOperations.getBuddies().then(function(response) {
      
      //console.log(response);    
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
         $scope.interest=response.data.Interest;
         // console.log($scope.discussion); 
          $scope.totalfriends=response.data.frineds_count; 
          $scope.totalforum=response.data.forum_count; 

       
     
     });
    
    $scope.otherProfile = function(userId){
        regService.getUserDetails(userId).then(function (results) {
          $scope.userD = results.data; 
          //console.log($scope.userD);
           if ($scope.userD.status == 0) {
            alert("Your profile is deactive. Please contact Customer care.");
          }else{
            $location.url("/otherprofile?user_id="+userId);
          }
        });
          
          
        }

   
  });
