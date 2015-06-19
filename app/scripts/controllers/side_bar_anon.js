'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarAnonCtrl
 * @description
 * # SideBarAnonCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarAnonCtrl', function ($scope,$location,localStorageService,regService,$routeParams,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.SideBarAnon = 'views/side_bar_anon.html';
    $scope.thumbup='true';
     $scope.user_id = $routeParams.user_id;
     // console.log( $scope.user_id);

      


     regService.getPicture($scope.user_id).then(function(res) {
            $scope.pic=res.data; 
            // console.log($scope.pic.Picture);
    });

     
    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails($scope.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        // console.log($scope.userData.Picture);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });
      $scope.UserId={};
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

  profileOperations.checkAbuseUser($scope.user_id).then(function(abuse) {
          console.log(abuse.data);
          $scope.chkabuse = abuse.data;
          console.log($scope.chkabuse);
          $scope.a='ok';
          if ($scope.chkabuse == 1){
            $scope.abuseHide ="false";
            console.log("False");
          }else if( $scope.chkabuse == 0) {
            $scope.abuseHide ="true";
            console.log("True");
          } 
          console.log("Outside");      
        });

$scope.reportAbuse = function(){
  $location.path('/report-abuse-user');
 };


  });

