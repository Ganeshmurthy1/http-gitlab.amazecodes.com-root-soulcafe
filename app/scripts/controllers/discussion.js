'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionCtrl
 * @description
 * # DiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionCtrl', function ($scope,$routeParams,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",$routeParams.topic);
     var authData = localStorageService.get('authorizationData');
     $scope.userId=authData.user_id;
     console.log("user id is ....................",$scope.userId)

      regService.getdiscussionTopicName($routeParams.topic).then(function (results) {

        $scope.topicName = results.data[0].TopicTitle;        

     });


      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {

     	console.log("susess");
     	  $scope.comments = results.data; 
     	  console.log("datassss",$scope.comments);

     });


     ;
  });
