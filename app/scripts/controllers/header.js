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
        $scope.totalSysMessage = response.data.system.total;
        $scope.totalMessage = response.data.message.total;
        $scope.totalForumMessage = response.data.forum.total;

      });

      $scope.sysMessage = function() {  
    	  $scope.sysmessages ={};
    	  regService.sysMarkMessage().then(function (response) { 
    		  $scope.sysmessages = response.data;
    		  $scope.totalSysMessage = 0;
         
          if($scope.sysmessages.length == 0){
            $scope.sysmessages[0] = {};
            $scope.sysmessages[0] = {
              mess:"No message for you now",
              Link: "home"
            }
          }
      	});
      };
      
      $scope.Message = function() { 
    	  $scope.mymessages = {};
    	  regService.MarkMessage().then(function (response) {

    		  $scope.mymessages = response.data;
    		  $scope.totalMessage = 0;
           if($scope.mymessages.length == 0){
            $scope.mymessages[0] = {};
            $scope.mymessages[0] = {
              mess:"No message for you now",
              Link: "home"
            }
          }      		
      	});
      };
      $scope.forumMessage = function() {  
    	  regService.forumMarkMessage().then(function (response) { 
    		  $scope.messages = response.data;
    		  $scope.totalForumMessage = 0;
          if($scope.messages.length == 0){
            $scope.messages[0] = {};
            $scope.messages[0] = {
              mess:"No message for you now",
              Link: "home"
            }
          }      		
      	});
      };

  });
