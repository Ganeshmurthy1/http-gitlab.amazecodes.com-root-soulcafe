'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionListCtrl
 * @description
 * # DiscussionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionListCtrl', function ($scope,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  //   $scope.userData = {};
  //   function getUSerdata() {
  //    var authData = localStorageService.get('authorizationData');
  //    // console.log(authData);
  //    regService.getUserDetails(authData.user_id).then(function (results) {
  //      // console.log(results.data);
  //      $scope.userData = results.data; 
  //      console.log($scope.userData.birthdate);
  //       var d1 = new Date($scope.userData.birthdate);
  // console.log($scope.userData.birthdate);
  //    var d2 = new Date();
    // var diff = d2.getFullYear()-d1.getFullYear();
    // console.log(diff); 
  //    });
    
  //     }
  //    getUSerdata();
      
  $scope.showd=false;
    
     regService.getDiscussionDetails().then(function (results) {

       console.log(results.data);
       $scope.discussionData = results.data;
       console.log($scope.discussionData.length);
       var authData = localStorageService.get('authorizationData');
         regService.getUserDetails(authData.user_id).then(function (results) {
            regService.getDiscussionListStatus().then(function (res) {
              console.log(res);


              //check
              $scope.DiscussionJoin=res.data;
              console.log("the 1st one ?????????????????????????",$scope.DiscussionJoin[0].DiscussionBoardId)

              if (res.data.DiscussionBoardId != '') {
                  var joinFlag = true;

              };
            
            console.log(results.data);
            $scope.userData = results.data; 
            console.log($scope.userData.birthdate);
            var d1 = new Date($scope.userData.birthdate);
            var d2 = new Date();
            var diff = d2.getFullYear()-d1.getFullYear();
            console.log(diff); 
            for (var i = 0; i < $scope.discussionData.length; i++) {

              $scope.discussionData[i].view="false";
              // $scope.discussionData[i].join = 0;
              // console.log("AAAAA");
              // console.log($scope.discussionData[i].Restricted);
              if( $scope.discussionData[i].Restricted == 0){
                // console.log($scope.DiscussionJoin.length);
                $scope.discussionData[i].join="true";
              for (var x  in $scope.DiscussionJoin) {
                  console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                  if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                    console.log("Inside if");
                    $scope.discussionData[i].join="false";
                    $scope.discussionData[i].view="true";
                  }
              
                }


                
                // console.log("Anbh");
                console.log($scope.discussionData[i].join);
              }
              else
              {
                // console.log("Abhik");
                
                if($scope.discussionData[i].RestrictedAge == null){
                  // console.log("AbhikAge");
                  if($scope.discussionData[i].RestrictedGender == null){
                    // console.log("AbhikGender");
                     if($scope.discussionData[i].RestrictedLocation == null){

                        $scope.discussionData[i].join="true";
                        for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                     }else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                        $scope.discussionData[i].join="true";
                          for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        // console.log("AbhikElse");
                     };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                    if ($scope.discussionData[i].RestrictedLocation == null) {
                       $scope.discussionData[i].join="true";
                       for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                    }else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                      // console.log("AbhikGenderLocationElse");
                        $scope.discussionData[i].join="true";
                        for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                    };
                  };
                }else if (diff >=$scope.discussionData[i].RestrictedAge) {

                    if ($scope.discussionData[i].RestrictedGender == null) {
                       if($scope.discussionData[i].RestrictedLocation == null){
                          $scope.discussionData[i].join="true";
                          for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        } else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                          $scope.discussionData[i].join="true";
                          for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                      // alert("age not ok");
                        if($scope.discussionData[i].RestrictedLocation == null){
                          $scope.discussionData[i].join="true";
                          for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
                              $scope.discussionData[i].join="false";
                              $scope.discussionData[i].view="true";
                            }
                        
                          }
                        } else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                          $scope.discussionData[i].join="true";
                          for (var x  in $scope.DiscussionJoin) {
                            console.log("inside for loop " ,$scope.DiscussionJoin[x].DiscussionBoardId);
                            if ($scope.discussionData[i].DiscussionBoardId == $scope.DiscussionJoin[x].DiscussionBoardId ){
                              console.log("Inside if");
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
  console.log(id);
  // $scope.discussionId = id;
  console.log($scope.discussionId);
  regService.joinDiscussion(id).then(function(response) {
   console.log(response);
    
  });
}


});