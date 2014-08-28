'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionTopicsCtrl
 * @description
 * # DiscussionTopicsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionTopicsCtrl', function ($routeParams,$scope,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log($routeParams.discussionid);
     $scope.discussionid=$routeParams.discussionid;
     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {

     	console.log("susess");
     	  $scope.discussions = results.data; 
     	  console.log("datassss",$scope.discussions);

     });


  });
