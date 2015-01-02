'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionTopicsCtrl
 * @description
 * # DiscussionTopicsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionTopicsCtrl', function ($routeParams,$scope,localStorageService,regService,$location, config, $modal, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.discussionid=$routeParams.discussionid;
    // console.log($scope.discussionid);
    regService.getdiscussionListTopicName($scope.discussionid).then(function (topicTotal) {
      console.log(topicTotal);
        $scope.topicName = topicTotal.data[0].Topic;
        $scope.desc = topicTotal.data[0].Description;
        $scope.img = topicTotal.data[0].Image;    
      });

     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {
         // console.log(results);
     	  $scope.discussions = results.data; 
  // console.log($scope.discussions);
  // console.log($scope.discussions[0].TopicTitle);
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
       console.log( $scope.discussions);
     
     });


     });

     regService.getTotalMembers($scope.discussionid).then(function (totalMembers) {
         console.log(totalMembers);
        $scope.total = totalMembers.data[0].total; 
        console.log( $scope.total); 
        if ($scope.total == 0) {
          $scope.memhide = true;
        };      
     });


     $scope.isAdmin = false;
     var authData = localStorageService.get('authorizationData');
      
       regService.userJoined($scope.discussionid).then(function (res) {
        console.log("Abhik");
           console.log(res.data.total);
           if(res.data.total == 1){
            $scope.disable = "false";
           }else{
            $scope.disable = "true";
           }
               
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

    $scope.joinButtonClick = function(id){
       $scope.disable = "false";
      console.log(id);
      regService.joinDiscussion(id).then(function(response) {
       console.log(response);
        
      });
    }

    $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (id) {
    console.log(id);
    var modalInstance = $modal.open({
      templateUrl: 'modalMember.html',
      controller: 'modalMemberCtrl',
      resolve: {
        items: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
    
  
});
angular.module('sassApp')
.controller('modalMemberCtrl', function ($scope, regService, profileOperations, localStorageService, $location, $modalInstance, items, config,messageCodes) {

  $scope.hide=true;
  $scope.items = items;
  console.log($scope.items);

  var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

  // $scope.selected = {
  //   item: $scope.items[0]
  // };

    profileOperations.getMember($scope.items).then(function(response) {
     
      console.log(response);    
      $scope.memData=response.data;         
    });

    $scope.otherProfile = function(userId){
        regService.getUserDetails(userId).then(function (results) {
          $scope.userD = results.data; 
          console.log($scope.userD);
           if ($scope.userD.status == 0) {
             $scope.hide=false;
             $scope.q = '';
              var q = 105;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
                $scope.q = messageCodes.Messages[q];
            }
            // $scope.abuseSuccessMessage="This profile is currently deactivated in SoulCafe.";
            
            // $modalInstance.dismiss();
          }else{
            $location.url("/otherprofile?user_id="+userId);
             $modalInstance.dismiss();
          }
        });
          
          
        }


  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


    

    
});