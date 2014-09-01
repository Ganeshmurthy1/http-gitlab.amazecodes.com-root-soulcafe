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


  
     var authData = localStorageService.get('authorizationData');

     $scope.userId=authData.user_id;
    

      regService.getdiscussionTopicName($routeParams.topic).then(function (results) {
        $scope.topicName = results.data[0].TopicTitle;        
        });


      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {
     	  $scope.comments = results.data; 
            });




    $scope.abuseReport = function(arg) {
        regService.saveDiscussionboardAbuse(arg).then(function (results) {
         console.log("aaaaaa");
            });
        };


    $scope.commentLike = function(arg) {
      
       console.log("commentLike",arg);
        regService.setCommentsLike(arg).then(function (results) {
         console.log("aaaaaa");
            });
        };

        $scope.addcomment = function() {

          var comm=$scope.comment;
        
        var args=new Object();

args.topicId=$routeParams.topic;
args.comment=$scope.comment;
      
        console.log(args);

        regService.saveComments(args).then(function (results) {
         // console.log("aaaaaa");


         console.log(results);
            });



        };

    
  });
