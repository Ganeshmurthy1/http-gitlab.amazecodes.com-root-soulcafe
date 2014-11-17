'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionCtrl
 * @description
 * # DiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionCtrl', function ($scope,$routeParams,$facebook,localStorageService,regService,$location, $window) {
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
// console.log( $scope.comments);
        regService.getPicturesComments($routeParams.topic).then(function (results) {
             $scope.picture=results.data;
             // console.log( $scope.picture);
             for (var a in $scope.comments){
        for (var j = 0; j <  $scope.picture.length; j++) {
        
        if($scope.comments[a].CommentId == $scope.picture[j].CommentId){
            console.log("AAA");
                $scope.comments[a].Picture = $scope.picture[j].Picture;
        }
        }; 
      }; 
         // console.log($scope.comments);     
        });
       
            });
    }

    $scope.abuseReport = function(arg) {
      console.log(arg);
        regService.saveDiscussionBoardAbuse(arg).then(function (results) {
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
            	if(results.data == 'profane') {
            		$scope.errMessage = "Your comment will be posted only after moderation";
            	}
            	else {
            		$scope.errMessage ='';
            	}
            console.log(results.data);
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

 regService.getPicture($scope.userId).then(function(response) {
            $scope.pic=response.data; 
            // console.log($scope.pic.Picture);
    });


 $scope.userDetails = function(userId){
    console.log(userId);

    regService.getUserDetails(userId).then(function (results) {
        // console.log(results.data);
        $scope.userData = results.data; 
        console.log($scope.userData);
        if ($scope.userData.status == 1) {
          // $location.path('/dashboard-anon?user_id=87');
          $window.location.href = '#/dashboard-anon?user_id=87';
        }else{
          alert("This user is not active in Soulcafe");
        }
            
      });

    $facebook.api("/800856129935365/likes").then(function(pic) {
                console.log(pic);
              
           //   var fbbbbdata = localStorageService.get('fbpicture');
            // console.log(fbbbbdata);
          });
 }

  });
