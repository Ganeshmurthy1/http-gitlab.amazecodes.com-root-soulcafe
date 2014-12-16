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
    }else if ($location.path() == '/myprofile') {
      $scope.defaultp = true;
    }else{
      $scope.defaulth = false;
      $scope.defaultp = false;
    }
 

    $scope.datau = localStorageService.get('authorizationData');
    $scope.pict=$scope.datau.picture;

    $scope.popup = false;

      regService.getTotalNotification($scope.datau.user_id).then(function(response) {
        //console.log(response.data);
        $scope.totalSysMessage = response.data.system.total;
        $scope.totalMessage = response.data.message.total;
        $scope.totalForumMessage = response.data.forum.total;
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
