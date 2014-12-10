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
      
     
      regService.getUserDetails(authData.user_id).then(function (results) {
        console.log(results.data);
        $scope.userData = results.data; 
        
       // var fbpic = localStorageService.get('fbpicture');

        $scope.pict = localStorageService.get('fbpicture');
        console.log($scope.pict);
        //localStorageService.set('fbpicture', {fbpicture:$scope.pict});

        var d1 = new Date($scope.userData.birthdate);
        var d2 = new Date();
      $scope.diff = d2.getFullYear()-d1.getFullYear();
      console.log($scope.diff);
          console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.updateButton = 'true';
           console.log("Abhik");
          regService.getLinkedinProffesionaldetails(authData.user_id).then(function(response) {
                  // console.log(response);
                  $scope.proffesionalDetails = response;
                  console.log($scope.proffesionalDetails);
                });
      
        }     
      });
     
      }
    
    getUSerdata();

    profileOperations.getBuddies().then(function(response) {
      
      console.log(response);    
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
          console.log($scope.discussion); 
          $scope.totalfriends=$scope.friends.length; 

        //   foreach ( $scope.friends as $friend) {
        // if($scope.friends.UpdatedPicture == null){
        //   $scope.friends.pict = $scope.userData.Picture;
        //   localStorageService.set('fbpicture', {fbpicture:$scope.pict});
        // }else{
        //   $scope.friends.pict = $scope.imagepath + $scope.userData.UpdatedPicture;
        //   console.log($scope.pict);
        //   localStorageService.set('fbpicture', {fbpicture:$scope.pict});
        // } 
        // }
     
     });

   
  });
