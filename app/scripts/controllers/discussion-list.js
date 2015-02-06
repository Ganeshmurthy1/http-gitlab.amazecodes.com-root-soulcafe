'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionListCtrl
 * @description
 * # DiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionListCtrl', function ($scope,$location,localStorageService,regService, config, $routeParams,messageCodes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var abs = $routeParams.abm;
    if(abs != undefined) {
    	$scope.repotabuseMessage = true;
    }
    $scope.q = '';
    var q = $routeParams.q;
    if (q != null) {
      console.log(messageCodes.Messages[q]);
      $scope.q = messageCodes.Messages[q];
    }
    var disp = $routeParams.disp;
    if(disp != undefined) {
    	$scope.topicMessage = true;
    }
    
var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

  $scope.showd=false;
    
     regService.getDiscussionDetails().then(function (results) {

       $scope.discussionData = results.data;
       var authData = localStorageService.get('authorizationData');
         regService.getUserDetails(authData.user_id).then(function (results) {
            regService.getDiscussionListStatus().then(function (res) {
               regService.getTotalMemberFromAllDiscussion().then(function(mem) {
               $scope.totalmem = mem.data;
               for (var z  in $scope.discussionData) {
                for (var y  in $scope.totalmem) {
                if($scope.discussionData[z].DiscussionBoardId == $scope.totalmem[y].DiscussionBoardId){
                  $scope.discussionData[z].totalmem = $scope.totalmem[y].TotalMember;
                }
                }
              }
              });

              //check
              $scope.DiscussionJoin=res.data;

              if (res.data.DiscussionBoardId != '') {
                  var joinFlag = true;
              };
            
            $scope.userData = results.data; 
            var d1 = new Date($scope.userData.birthdate);
            var d2 = new Date();
            var diff = d2.getFullYear()-d1.getFullYear(); 
             var authData = localStorageService.get('authorizationData');
            for (var i = 0; i < $scope.discussionData.length; i++) {             
              $scope.discussionData[i].view="false";
              $scope.discussionData[i].sr=i+1;
              $scope.isAdmin = false;
               if( $scope.discussionData[i].Restricted == 0){
                $scope.discussionData[i].join="true";
                $scope.discussionData[i].show="true";
              for (var x  in $scope.DiscussionJoin) {
                  if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                    $scope.discussionData[i].join="false";
                    $scope.discussionData[i].view="true";
                  }
              
                }
              }
              else
              {
                
                if($scope.discussionData[i].RestrictedAge == null){
                  if($scope.discussionData[i].RestrictedGender == null){
                     if($scope.discussionData[i].RestrictedLocation == false){
                        $scope.discussionData[i].join="true";
                        $scope.discussionData[i].show="true";
                        for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                     }else if (inArray($scope.userData.location, $scope.discussionData[i].RestrictedLocation)) {
                        $scope.discussionData[i].join="true";
                        $scope.discussionData[i].show="true";
                          for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                     };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                   
                    if ($scope.discussionData[i].RestrictedLocation == false) {
                       $scope.discussionData[i].join="true";
                       $scope.discussionData[i].show="true";
                       for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                    }else if (inArray($scope.userData.location, $scope.discussionData[i].RestrictedLocation)) {
                        $scope.discussionData[i].join="true";
                        $scope.discussionData[i].show="true";
                        for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                    };
                  };
                }else if (diff >=$scope.discussionData[i].RestrictedAge) {

                    if ($scope.discussionData[i].RestrictedGender == null) {
                       if($scope.discussionData[i].RestrictedLocation == false){
                          $scope.discussionData[i].join="true";
                          $scope.discussionData[i].show="true";
                          for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        } else if (inArray($scope.userData.location, $scope.discussionData[i].RestrictedLocation)) {
                          $scope.discussionData[i].join="true";
                          $scope.discussionData[i].show="true";
                          for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                        if($scope.discussionData[i].RestrictedLocation == false){
                          $scope.discussionData[i].join="true";
                          $scope.discussionData[i].show="true";
                          for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        } else if (inArray($scope.userData.location, $scope.discussionData[i].RestrictedLocation)) {
                          $scope.discussionData[i].join="true";
                          $scope.discussionData[i].show="true";
                          for (var x  in $scope.DiscussionJoin) {
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        };
                    };
                };
              };
            };
        });
      });



  });

$scope.joinButtonClick = function(id){
  regService.joinDiscussion(id).then(function(response) {
   console.log(response);
    
  });
}

$scope.removeUser = function(id){
      regService.removeUser(id.DiscussionBoardId).then(function (results) {
        $scope.res = results.data; 
        if ($scope.res == 'true') {
          $scope.discussionData[id.sr-1].join="true";
          $scope.discussionData[id.sr-1].view="false";
          regService.getTotalMemberFromAllDiscussion().then(function(mem) {
               $scope.totalmem = mem.data;
               for (var z  in $scope.discussionData) {
                for (var y  in $scope.totalmem) {
                if($scope.discussionData[z].DiscussionBoardId == $scope.totalmem[y].DiscussionBoardId){
                  $scope.discussionData[z].totalmem = $scope.totalmem[y].TotalMember;
                }
                }
              }
              });
        }     
      }); 

     }



function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

});