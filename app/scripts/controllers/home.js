'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HomeCtrl',['$scope','$location','localStorageService','regService', '$routeParams','profileOperations', function ($scope, $location, localStorageService, regService, $routeParams, profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
    
    
    $scope.caroselImage=['http://www.chem.uit.no/KJEMI/ghosh.jpg','http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
                         'http://media.cirrusmedia.com.au/LW_Media_Library/594partner-profile-pic-An.jpg',
                         'http://2.bp.blogspot.com/-dZKdgsUW2y0/Une2h3IIVMI/AAAAAAAAC1o/tqJJFHKzHfY/s640/katrina-kaif-Complete-Profile.jpg','http://4.bp.blogspot.com/--fWusEFYKHg/UT8Wr9TVAlI/AAAAAAAAABY/9_HoTCeoA3c/s1600/url.jpeg']; 
  
    
     regService.getRecomendations().then(function (results) {

       

        
      });



    $scope.thumbup = 'true';
    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails(authData.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });


      profileOperations.getUserMatch().then(function(response) {
      
      console.log(response);    
         $scope.recommendation=response.data;    
           
      });

      profileOperations.getForumUpdates().then(function(response) {
      
      console.log(response);    
         $scope.updates=response.data;         
      });
      

      $scope.otherProfile = function(userId){
      regService.getUserDetails(userId).then(function (results) {
        $scope.userD = results.data; 
        console.log($scope.userD);
         if ($scope.userD.status == 0) {
          alert("Your profile is deactive. Please contact Customer care.");
        }else{
          $location.url("/otherprofile?user_id="+userId);
        }
      });
        
        
      }

      // #/otherprofile?user_id={{rec.user_id}}

   }]);