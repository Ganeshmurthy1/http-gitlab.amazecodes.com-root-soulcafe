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

    if($location.path() == '/edit-profile-new'){
      $scope.moreHide = 'true';
    }else{
      $scope.moreHide = 'false';
    }

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.SideBar = 'views/side_bar.html';
    
    
    $scope.sideData = localStorageService.get('authorizationData');
    //console.log($scope.sideData); 
    var d1 = new Date($scope.sideData.birthdate);
    var d2 = new Date();
    $scope.diff = d2.getFullYear()-d1.getFullYear();

$scope.noforum = "false";
$scope.nofriend = "false";
    profileOperations.getBuddies().then(function(response) {
         
         $scope.friends=response.data.friends;
         $scope.discussion=response.data.forum;
         $scope.interest=response.data.Interest;
          $scope.totalfriends=response.data.frineds_count; 
          $scope.totalforum=response.data.forum_count;
          if ($scope.totalforum == 0) {
            //console.log("Annjdsksd");
            $scope.noforum = "true";
          };
          if ($scope.totalfriends == 0) {
            console.log("Annjdsksd");
            $scope.nofriend = "true";
          }; 

       
     
     });
    
     $scope.hide=false;

      $scope.otherProfile = function(userId){
      regService.getUserDetails(userId).then(function (results) {
        $scope.userD = results.data; 
        
         if ($scope.userD.status == 0) {
          
            $scope.hide=true;
            
            $scope.q = '';
              var q = 105;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
                $scope.q = messageCodes.Messages[q];
            }
            
            $location.hash('msg');
             $anchorScroll();
        }else{
          $location.url("/otherprofile?user_id="+userId);
        }
      });
        
        
      }

   
  });
