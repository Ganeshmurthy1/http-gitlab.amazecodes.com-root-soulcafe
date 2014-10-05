'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarCtrl', function ($scope, localStorageService,regService, $location) {

$scope.SideBar = 'views/side_bar.html';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isAdmin = false;
    var authData = localStorageService.get('authorizationData');
    if(authData.user_role == 1) {
    	$scope.isAdmin = true;
      $scope.isUser = true;
    }
    $scope.popup = false;
    
   regService.getPicture(authData.user_id).then(function(response) {
            $scope.pic=response.data; 
            // console.log($scope.pic.Picture);
    });

   regService.getDiscussionDetails().then(function (results) {

       $scope.discussionData = results.data;
    });
   $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails(authData.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        // console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });
      
      regService.getTotalSysMessage(authData.user_id).then(function(response) {
    	  //console.log(response.data.total);
          $scope.totalSysMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });
      regService.getTotalMessage(authData.user_id).then(function(response) {
          $scope.totalMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });
      regService.getTotalForumMessage(authData.user_id).then(function(response) {
          $scope.totalForumMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });
      
      $scope.sysMessage = function() {  
    	  regService.sysMarkMessage().then(function (response) { 
    		  $scope.messages = response.data;
    		  $scope.totalSysMessage = 0;
    		  $scope.popup = true;
      		
      	});
      };
      
      $scope.Message = function() {  
    	  regService.MarkMessage().then(function (response) { 
    		  $scope.messages = response.data;
    		  $scope.totalMessage = 0;
    		  $scope.popup = true;
      		
      	});
      };
      $scope.forumMessage = function() {  
    	  regService.forumMarkMessage().then(function (response) { 
    		  $scope.messages = response.data;
    		  $scope.totalForumMessage = 0;
    		  $scope.popup = true;
      		
      	});
      };

  });
