'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeaderCtrl', function ($scope, localStorageService,regService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.Header = 'views/header.html';
    
    if($location.path() == '/home'){
      $scope.defaulth = true;
      console.log("1");
    }else if ($location.path() == '/myprofile') {
      $scope.defaultp = true;
      console.log("2");
    }else{
      $scope.defaulth = false;
       $scope.defaultp = false;
    }
 
    $scope.isAdmin = false;
    var authData = localStorageService.get('authorizationData');
    console.log(authData);
    $scope.datau = authData;
     console.log($scope.datau);

     var fbpic = localStorageService.get('fbpicture');
     console.log(fbpic);
     $scope.pict=fbpic.fbpicture;
    if(authData.user_role == 1) {
    	$scope.isAdmin = true;
      $scope.isUser = true;
    }
    $scope.popup = false;

      regService.getTotalNotification(authData.user_id).then(function(response) {
        console.log(response.data);
        $scope.totalSysMessage = response.data.system.total;
        $scope.totalMessage = response.data.message.total;
        $scope.totalForumMessage = response.data.forum.total;
          // $scope.totalSysMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });

    // regService.getTotalSysMessage(authData.user_id).then(function(response) {
    // 	  console.log(response.data.total);
    //       $scope.totalSysMessage = response.data.total; 
    //       // console.log($scope.pic.Picture);
    //   });
    //   regService.getTotalMessage(authData.user_id).then(function(response) {
    //     console.log(response.data.total);
    //       $scope.totalMessage = response.data.total; 
    //       // console.log($scope.pic.Picture);
    //   });
    //   regService.getTotalForumMessage(authData.user_id).then(function(response) {
    //     console.log(response.data.total);
    //       $scope.totalForumMessage = response.data.total; 
    //       // console.log($scope.pic.Picture);
    //   });

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
