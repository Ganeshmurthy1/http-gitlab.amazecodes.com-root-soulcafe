'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionCtrl
 * @description
 * # DiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionCtrl', function ($scope,$routeParams,$facebook,localStorageService,regService,$location, $window, $modal, $log, config,$anchorScroll,messageCodes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

        regService.getRating($routeParams.topic).then(function (results) {
              if(results.data.avg == null){
                $scope.ratings = [{
                    current: 1,
                    max: 5
                }];
              }else{
                $scope.ratings = [{
                  current:results.data.avg,
                  max: 5
              }];
              }
              
                       
        });
         

        $scope.getSelectedRating = function(rating) {
        };

  

    $scope.hide=true;
    var authData = localStorageService.get('authorizationData');
    $scope.userId=authData.user_id;
    $scope.pict = authData.picture;

    getForumComments();
    
    function getForumComments() {
      regService.getdiscussionTopicName($routeParams.topic).then(function (results) {
        $scope.topicName = results.data[0].TopicTitle;
        $scope.id = results.data[0].DiscussionBoardId;       
        $scope.desc = results.data[0].TopicDescription;      
        });

      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {
        $scope.comments = results.data; 
        regService.getPicturesComments($routeParams.topic).then(function (results) {
             $scope.picture=results.data;
             for (var a in $scope.comments){
        for (var j = 0; j <  $scope.picture.length; j++) {
        
        if($scope.comments[a].CommentId == $scope.picture[j].CommentId){
                $scope.comments[a].Picture = $scope.picture[j].Picture;
        }
        }; 
      };     
        });
       
            });
    }

    $scope.otherProfile = function(data){
           if (data.status == 0) {
            $scope.hide=false;
            $scope.q = '';
              var q = 105;
              if (q != null) {
                $scope.q = messageCodes.Messages[q];
            }
            $location.hash('msg');
             $anchorScroll();
          }else{
            $location.url("/otherprofile?user_id="+data.UserId);
          }
       
          
          
        }

    $scope.abuseReport = function(arg) {
        regService.saveDiscussionBoardAbuse(arg).then(function (results) {
          $scope.hide=false;
            if (results.data == 'true') {
              $scope.q = '';
              var q = 113;
              if (q != null) {
                $scope.q = messageCodes.Messages[q];
            }
            };
              
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
            	   $scope.mod = '';
              var mod = 112;
              if (mod != null) {
                $scope.mod = messageCodes.Messages[mod];
            }
              }
            	else {
            		$scope.errMessage ='';
            	}
              getForumComments();
            });
        };


     $scope.deleteComment = function(commentId) {

            regService.deleteComment(commentId).then(function (results) {
 getForumComments();

            });
        };

$scope.addRating = function(rating){
  rating.topicId = $routeParams.topic;
      regService.insertRating(rating).then(function (results) {
             regService.getRating($routeParams.topic).then(function (results) {
              $scope.ratings = [{
                  current:results.data.avg,
                  max: 5
              }];
                       
        });
      });
}

 regService.getPicture($scope.userId).then(function(response) {
            $scope.pic=response.data; 
    });


 $scope.userDetails = function(userId){
    regService.getUserDetails(userId).then(function (results) {
        $scope.userData = results.data; 
        if ($scope.userData.status == 1) {
          $window.location.href = '#/dashboard-anon?user_id=87';
        }else{
          alert("This user is not active in Soulcafe");
        }
            
      });

 }

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (id) {
    var modalInstance = $modal.open({
      templateUrl: 'modalLikes.html',
      controller: 'modalLikesCtrl',
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
.controller('modalLikesCtrl', function ($scope, regService, profileOperations, localStorageService, $location, $modalInstance, items, config, messageCodes) {

  $scope.hide=true;
  $scope.items = items;
  var config = localStorageService.get('config');
  $scope.imagepath = config.image_path;

    profileOperations.getCommentLike($scope.items).then(function(response) {    
      $scope.likeData=response.data;         
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