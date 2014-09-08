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

      $scope.ratings = [{
            current: 1,
            max: 5
        }];

        regService.getRating($routeParams.topic).then(function (results) {
             // console.log(results);
             if(results.data.rating == 0){
                $scope.ratings = [{
               current: 1,
                 max: 5
                 }];
             }else{
              $scope.ratings.current = parseInt(results.data.rating);
              console.log($scope.ratings.current);
              $scope.ratings = [{
               current: $scope.ratings.current,
                 max: 5
                 }];
             }
              
        });

       

        $scope.getSelectedRating = function(rating) {
            console.log(rating);
        };

  

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
            $scope.comment="";
            regService.saveComments(args).then(function (results) {
              getForumComments();
            });
        };


     $scope.deleteComment = function(commentId) {
      console.log("comment id is  ...." ,commentId);

            regService.deleteComment(commentId).then(function (results) {

              console.log("delete success full");
 getForumComments();

            });
        };

$scope.addRating = function(rating){
  console.log(rating);
  rating.topicId = $routeParams.topic;
  console.log(rating);
      regService.updateRating(rating).then(function (results) {
             console.log(results);
        });
}


  });
