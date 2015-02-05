'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ReplyMessageCtrl
 * @description
 * # ReplyMessageCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ReplyMessageCtrl', function ($scope, adminOperations, regService, $routeParams, $location,config,localStorageService,$anchorScroll, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    // $location.hash('msg');
    //  $anchorScroll();

    $scope.sid=$routeParams.sid;

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
    $scope.sendMyMessage = function(arg) {
    	var args=new Object();
      args.uid = $routeParams.sid;
      args.comment=$scope.comment;
      $scope.comment="";
      adminOperations.sentMessage(args).then(function(response) {
    	  $location.path('my-messages');
      }); 
     };
    
    function getUser() {
    	adminOperations.getPictureAndName($scope.sid).then(function(response) {
            $scope.pic=response.data;
    });    	
	    
    }
    
    
    
    getUser();
  });
