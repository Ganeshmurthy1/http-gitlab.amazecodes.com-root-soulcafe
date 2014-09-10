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
    regService.getdiscussionListTopicName($scope.discussionid).then(function (topicTotal) {
      console.log(topicTotal);
        $scope.topicName = topicTotal.data[0].Topic;    
      });

     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {
         console.log(results);
     	  $scope.discussions = results.data; 

      regService.getProfilePictures($scope.discussionid).then(function (images) {
         // console.log(images);
        $scope.profileImages = images.data; 
        console.log( $scope.profileImages);  
      for (var j = 0; j < $scope.profileImages.length; j++) {
        // console.log("AA");
     
           if($scope.discussions[j].DiscussionTopicId == $scope.profileImages[j].DiscussionTopicId){
            console.log("AAA");
                $scope.discussions[j].Picture = $scope.profileImages[j].Picture;
        }else{
          $scope.discussions[j].Picture = null;
        }
       
        
      };   
      console.log( $scope.discussions);  
     });

      regService.getTotalComments($scope.discussionid).then(function (comments) {
         console.log(comments);
        $scope.totalComments = comments.data; 
 
       for (var i = 0; i < $scope.discussions.length; i++) {
        // console.log("AA");
     
           if($scope.discussions[i].DiscussionTopicId == $scope.totalComments[i].DiscussionTopicId){
            // console.log("AAA");
                $scope.discussions[i].totalComments = $scope.totalComments[i].TotalComments;
        }
       
        // console.log( $scope.discussions[i].DiscussionTopicId);
      };
      // console.log( $scope.discussions);
     
     });


     });

     regService.getTotalMembers($scope.discussionid).then(function (totalMembers) {
         console.log(totalMembers);
        $scope.total = totalMembers.data[0].total; 
        console.log( $scope.total);       
     });


     $scope.isAdmin = false;
     var authData = localStorageService.get('authorizationData');
     if(authData.user_role == 1) {
        $scope.isAdmin = true;
         $scope.disable = "false";
      }else{
       regService.userJoined($scope.discussionid).then(function (res) {
        console.log("Abhik");
           console.log(res.data.total);
           if(res.data.total == 1){
            $scope.disable = "false";
           }else{
            $scope.disable = "true";
           }
               
       });
     }

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
