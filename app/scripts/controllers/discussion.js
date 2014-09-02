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


  

    $scope.hide=true;
    var authData = localStorageService.get('authorizationData');

    $scope.userId=authData.user_id;
    getForumComments();
    
    function getForumComments() {
      regService.getdiscussionTopicName($routeParams.topic).then(function (results) {
        $scope.topicName = results.data[0].TopicTitle;        
        });

      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {
        $scope.comments = results.data; 
            });
    }

    $scope.abuseReport = function(arg) {
        regService.saveDiscussionboardAbuse(arg).then(function (results) {
          $scope.hide=false;
          $scope.abuseSuccessMessage="Comment Reported";
            });
        };


    $scope.commentLike = function(arg) {
        regService.setCommentsLike(arg).then(function (results) {
          getForumComments();
         
         
            });
        };

        $scope.addcomment = function() {
            var args=new Object();
            args.topicId=$routeParams.topic;
            args.comment=$scope.comment;
            regService.saveComments(args).then(function (results) {
              getForumComments();
            });
        };
  });
