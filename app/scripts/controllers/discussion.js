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
              console.log(results.data.avg);
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
            console.log(rating);
        };

  

    $scope.hide=true;
    var authData = localStorageService.get('authorizationData');
    $scope.userId=authData.user_id;
    $scope.pict = authData.picture;

    getForumComments();
    
    function getForumComments() {
      regService.getdiscussionTopicName($routeParams.topic).then(function (results) {
        console.log(results.data);
        $scope.topicName = results.data[0].TopicTitle;
        $scope.id = results.data[0].DiscussionBoardId;       
        $scope.desc = results.data[0].TopicDescription;      
        });

      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {
        $scope.comments = results.data; 
        console.log( $scope.comments);
        regService.getPicturesComments($routeParams.topic).then(function (results) {
             $scope.picture=results.data;
              console.log( $scope.picture);
             for (var a in $scope.comments){
        for (var j = 0; j <  $scope.picture.length; j++) {
        
        if($scope.comments[a].CommentId == $scope.picture[j].CommentId){
            console.log("AAA");
                $scope.comments[a].Picture = $scope.picture[j].Picture;
        }
        }; 
      }; 
         console.log($scope.comments);     
        });
       
            });
    }

    $scope.otherProfile = function(data){
          // console.log(userId);
          console.log($scope.comments[0].status);
           if (data.status == 0) {
            $scope.hide=false;
             // $scope.abuseSuccessMessage="This profile is currently deactivated in SoulCafe.";
            $scope.q = '';
              var q = 105;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
                $scope.q = messageCodes.Messages[q];
            }
            $location.hash('msg');
             $anchorScroll();
            // alert("Your profile is deactive. Please contact Customer care.");
          }else{
            $location.url("/otherprofile?user_id="+data.UserId);
          }
       
          
          
        }

    $scope.abuseReport = function(arg) {
      console.log(arg);
        regService.saveDiscussionBoardAbuse(arg).then(function (results) {
          $scope.hide=false;
          console.log(results.data);
            if (results.data == 'true') {
              // console.log("anmsf");
              $scope.q = '';
              var q = 113;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
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
            		// $scope.errMessage = "Your comment will be posted only after moderation";
            	   $scope.mod = '';
              var mod = 112;
              if (mod != null) {
                console.log(messageCodes.Messages[mod]);
                $scope.mod = messageCodes.Messages[mod];
            }
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
      regService.insertRating(rating).then(function (results) {
             console.log(results);
             regService.getRating($routeParams.topic).then(function (results) {
              console.log(results.data.avg);
              $scope.ratings = [{
                  current:results.data.avg,
                  max: 5
              }];
                       
        });
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

 }

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (id) {
    console.log(id);
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
  console.log($scope.items);

  var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

  // $scope.selected = {
  //   item: $scope.items[0]
  // };

    profileOperations.getCommentLike($scope.items).then(function(response) {
     
      console.log(response);    
      $scope.likeData=response.data;         
    });

    $scope.otherProfile = function(userId){
        regService.getUserDetails(userId).then(function (results) {
          $scope.userD = results.data; 
          console.log($scope.userD);
           if ($scope.userD.status == 0) {
             $scope.hide=false;
             // $scope.abuseSuccessMessage="This profile is currently deactivated in SoulCafe.";
            $scope.q = '';
              var q = 105;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
                $scope.q = messageCodes.Messages[q];
            }
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