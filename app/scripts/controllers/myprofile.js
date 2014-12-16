'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MyprofileCtrl',['$facebook', '$scope','$location','localStorageService','regService', 'FlickrApi','$routeParams','profileOperations', function ($facebook, $scope, $location, localStorageService, regService,flickr,$routeParams,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var likeData = [];
    $facebook.api("/me/books").then(function(pic) {
    	//console.log(pic.data);
      if (pic.data != null) {
        for ( var int = 0; int < pic.data.length; int++) {
	        	var tmpdata = {};
	            tmpdata.text = pic.data[int].name;
	            tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
	            likeData.push(tmpdata);
        }
      }
    });   
    $facebook.api("/me/movies").then(function(pic) {
    	//console.log(pic.data);
      if (pic.data != null) {
        for ( var int = 0; int < pic.data.length; int++) {
	        	var tmpdata = {};
	            tmpdata.text = pic.data[int].name;
	            tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
	            likeData.push(tmpdata);
        }
      }
    });   
    $facebook.api("/me/music").then(function(pic) {
    	//console.log(pic.data);
      if (pic.data != null) {
        for ( var int = 0; int < pic.data.length; int++) {
	        	var tmpdata = {};
	            tmpdata.text = pic.data[int].name;
	            tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
	            likeData.push(tmpdata);
        }
      }
    });   
        
    $scope.words = likeData;
    
    $scope.thumbup = 'true';
    $scope.profileverify = '75%';
    var authData = localStorageService.get('authorizationData');
    $scope.userData = authData;
    console.log(authData.linked_update);
    if (authData.linked_update == 1){
        $scope.thumbup = 'false';
        $scope.profileverify = '100%';
         // console.log("1");
      }else{
        // console.log("1");
        $scope.thumbup = 'true';
      }

profileOperations.getMyProfileDetails().then(function(response) {
    console.log(response);    
    $scope.interests = response.data.values;
    $scope.ownwords = response.data.ownwords.OwnWords;
    console.log($scope.ownwords); 
  }); 
 }]);