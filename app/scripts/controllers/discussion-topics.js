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


    regService.getdiscussionListTopicName($scope.discussionid).then(function (results) {

        $scope.topicName = results.data[0].Topic;    
        console.log("TOPIc name ", $scope.topicName);    

     });


     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {

     	  $scope.discussions = results.data;      	

     });


});
