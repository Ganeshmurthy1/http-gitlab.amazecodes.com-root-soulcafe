'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:OtherprofileCtrl
 * @description
 * # OtherprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('OtherprofileCtrl', ['$scope','$location','localStorageService','regService', 'FlickrApi','$routeParams','profileOperations', '$facebook', function ($scope, $location, localStorageService, regService,flickr,$routeParams,profileOperations, $facebook) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.thumbup = 'true';
    $scope.user_id = $routeParams.user_id;
    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails($scope.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        // console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });


      $facebook.api("/$scope.userData.fb_id/likes").then(function(pic) {
      console.log(pic.data);
      var likeData = [];
      for ( var int = 0; int < pic.data.length; int++) {
        var tmpdata = {};
        tmpdata.text = pic.data[int].name;
        tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        likeData.push(tmpdata);
      }
      $scope.words = likeData;
      $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];
    });



      $scope.sendGTKY = function(){
              
      $location.path('/confirmGTKY');
      };

        profileOperations.checkGTKYRequest($scope.user_id).then(function(resp) {
          console.log(resp.data[0]);
          $scope.chkuser = resp.data[0];
          if ($scope.chkuser == null){
            console.log("Abhik Null");
            $scope.GTKY ="true";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
          }else if( $scope.chkuser.Status == 0) {
            console.log("Abhik Status 0");
             $scope.GTKY ="false";
            $scope.GTKY1 ="true";
            $scope.GTKY2 ="false";
          }else if($scope.chkuser.Status == 1){
            console.log("Abhik Status 1");
              $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="true";
          }
          // console.log("Outside");      
        });




 

}]);
