'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionTopicsCtrl
 * @description
 * # DiscussionTopicsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionTopicsCtrl', function ($routeParams,$scope,localStorageService,regService,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.discussionid=$routeParams.discussionid;
    regService.getdiscussionListTopicName($scope.discussionid).then(function (results) {
        $scope.topicName = results.data[0].Topic;    
      });

     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {
     	  $scope.discussions = results.data;      	
     });

     regService.getTotalMembers($scope.discussionid).then(function (results) {
        $scope.total = results.data[0].total; 
        console.log( $scope.total);       
     });

     $scope.removeUser = function(){
      regService.removeUser($scope.discussionid).then(function (results) {
        $scope.res = results.data; 
        // console.log( $scope.res); 
        if ($scope.res == 'true') {
          $location.path('/discussion-list');
        }     
      }); 

     }
  
});
