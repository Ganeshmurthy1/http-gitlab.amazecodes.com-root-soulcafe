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
  //   	var authData = localStorageService.get('authorizationData');
  //   	// console.log(authData);
  //   	regService.getUserDetails(authData.user_id).then(function (results) {
  //   		// console.log(results.data);
  //   		$scope.userData = results.data; 
  //   		console.log($scope.userData.birthdate);
  //   		 var d1 = new Date($scope.userData.birthdate);
  // console.log($scope.userData.birthdate);
  //   	var d2 = new Date();
		// var diff = d2.getFullYear()-d1.getFullYear();
		// console.log(diff);	
  //   	});
    
  //     }
  //    getUSerdata();
    	
  
    
     regService.getDiscussionDetails().then(function (results) {
       // console.log(results.data);
       $scope.discussionData = results.data;
       console.log($scope.discussionData.length);
       var authData = localStorageService.get('authorizationData');
         regService.getUserDetails(authData.user_id).then(function (results) {
            console.log(results.data);
            $scope.userData = results.data; 
            console.log($scope.userData.birthdate);
            var d1 = new Date($scope.userData.birthdate);
            var d2 = new Date();
            var diff = d2.getFullYear()-d1.getFullYear();
            console.log(diff); 
            for (var i = 0; i < $scope.discussionData.length; i++) {

              $scope.discussionData[i].join = 0;
              // console.log("AAAAA");
              // console.log($scope.discussionData[i].Restricted);
              if( $scope.discussionData[i].Restricted == 0){
                $scope.discussionData[i].join="true";
                // console.log("Anbh");
                console.log($scope.discussionData[i].join);
              }
              else
              {
                console.log("Abhik");
                // if(diff < $scope.discussionData[i].RestrictedAge){
                //     $scope.discussionData[i].join="true";
                // }
                // if($scope.userData.gender === $scope.discussionData[i].RestrictedGender){
                //   $scope.discussionData[i].join="true";
                // }
                // if($scope.userData.location === $scope.discussionData[i].RestrictedLocation){
                //   $scope.discussionData[i].join="true";
                // }
                if($scope.discussionData[i].RestrictedAge == null){
                  console.log("AbhikAge");
                  if($scope.discussionData[i].RestrictedGender == null){
                    console.log("AbhikGender");
                     if($scope.discussionData[i].RestrictedLocation == null){

                        $scope.discussionData[i].join=1;
                     }else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                        $scope.discussionData[i].join=1;
                        console.log("AbhikElse");
                     };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                    if ($scope.discussionData[i].RestrictedLocation == null) {
                       $scope.discussionData[i].join=1;
                    }else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                      console.log("AbhikGenderLocationElse");
                        $scope.discussionData[i].join=1;
                    };
                  };
                }else if (diff >= $scope.discussionData[i].RestrictedAge) {
                    if ($scope.discussionData[i].RestrictedGender == null) {
                       if($scope.discussionData[i].RestrictedLocation == null){
                          $scope.discussionData[i].join=1;
                        } else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                          $scope.discussionData[i].join=1;
                        };
                    }else if ($scope.userData.gender === $scope.discussionData[i].RestrictedGender) {
                        if($scope.discussionData[i].RestrictedLocation == null){
                          $scope.discussionData[i].join=1;
                        } else if ($scope.userData.location === $scope.discussionData[i].RestrictedLocation) {
                          $scope.discussionData[i].join=1;
                        };
                    };
                };
              };
            };
        
      });
  });
});
