'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionTopicsCtrl
 * @description
 * # DiscussionTopicsCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionTopicsCtrl', function ($routeParams,$scope,localStorageService,regService,$location, config, $modal, $log, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.discussionid=$routeParams.discussionid;
    regService.getdiscussionListTopicName($scope.discussionid).then(function (topicTotal) {
        $scope.topicName = topicTotal.data[0].Topic;
        $scope.desc = topicTotal.data[0].Description;
        $scope.img = topicTotal.data[0].Image;    
      });

     regService.getdiscussionTopicDetails($scope.discussionid).then(function (results) {
     	  $scope.discussions = results.data; 
      regService.getProfilePictures($scope.discussionid).then(function (images) {
        $scope.profileImages = images.data; 
        console.log( $scope.profileImages);  
      for (var j = 0; j < $scope.profileImages.length; j++) {     
           if($scope.discussions[j].DiscussionTopicId == $scope.profileImages[j].DiscussionTopicId){
                $scope.discussions[j].Picture = $scope.profileImages[j].Picture;
        }else{
          $scope.discussions[j].Picture = null;
        }
       
        
      };   
     });

      regService.getTotalComments($scope.discussionid).then(function (comments) {
        $scope.totalComments = comments.data; 
 
       for (var i = 0; i < $scope.discussions.length; i++) {     
           if($scope.discussions[i].DiscussionTopicId == $scope.totalComments[i].DiscussionTopicId){
                $scope.discussions[i].totalComments = $scope.totalComments[i].TotalComments;
        }
      };
     });


     });

     regService.getTotalMembers($scope.discussionid).then(function (totalMembers) {
        $scope.total = totalMembers.data[0].total; 
        if ($scope.total == 0) {
          $scope.memhide = true;
        };      
     });


     $scope.isAdmin = false;
     var authData = localStorageService.get('authorizationData');
      
       regService.userJoined($scope.discussionid).then(function (res) {
           if(res.data.total == 1){
            $scope.disable = "false";
           }else{
            $scope.disable = "true";
           }
               
       });

     $scope.removeUser = function(){
      regService.removeUser($scope.discussionid).then(function (results) {
        $scope.res = results.data;  
        if ($scope.res == 'true') {
          $location.path('/discussion-list');
        }     
      }); 

     }

    $scope.joinButtonClick = function(id){
       $scope.disable = "false";
      regService.joinDiscussion(id).then(function(response) {

        regService.getTotalMembers($scope.discussionid).then(function (totalMembers) {
        $scope.total = totalMembers.data[0].total; 
        if ($scope.total == 0) {
          $scope.memhide = true;
        };      
     });

        
      });
    }

    $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (id) {
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
  var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    profileOperations.getMember($scope.items).then(function(response) {  
      $scope.memData=response.data;         
    });

    $scope.otherProfile = function(userId){
        regService.getUserDetails(userId).then(function (results) {
          $scope.userD = results.data; 
           if ($scope.userD.status == 0) {
             $scope.hide=false;
             $scope.q = '';
              var q = 105;
              if (q != null) {
                $scope.q = messageCodes.Messages[q];
            }
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