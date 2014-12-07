'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeaderCtrl', function ($scope, localStorageService,regService, $location,config) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.Header = 'views/header.html';

    $scope.isAdmin = false;
    var authData = localStorageService.get('authorizationData');
    console.log(authData);
    $scope.datau = authData;
     console.log($scope.datau);

     // var fbpic = localStorageService.get('fbpicture');
     // $scope.pic=fbpic.fbpicture.data.url;
    if(authData.user_role == 1) {
    	$scope.isAdmin = true;
      $scope.isUser = true;
    }
    $scope.popup = false;

     regService.getPicture(authData.user_id).then(function(response) {
        console.log(response.data);
        if(response.data.UpdatedPicture == null){
          $scope.pict = response.data.Picture;
        }else{
          $scope.pict = $scope.imagepath + response.data.UpdatedPicture;
          console.log($scope.pict);
        }
      });

    regService.getTotalSysMessage(authData.user_id).then(function(response) {
    	  console.log(response.data.total);
          $scope.totalSysMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });
      regService.getTotalMessage(authData.user_id).then(function(response) {
        console.log(response.data.total);
          $scope.totalMessage = response.data.total; 
          // console.log($scope.pic.Picture);
      });
      regService.getTotalForumMessage(authData.user_id).then(function(response) {
        console.log(response.data.total);
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
