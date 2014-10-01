'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarAnonCtrl
 * @description
 * # SideBarAnonCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarAnonCtrl', function ($scope,localStorageService,regService,$routeParams,profileOperations) {
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
        $scope.UserId.id = $routeParams.user_id;
         profileOperations.addGTKYRequest($scope.UserId).then(function(response) {
          console.log(response.data);
          if (response.data = 'true'){
            $scope.GTKY ="true";
            alert("Friend Request Has been send");
          }            
        });
      };

  profileOperations.checkGTKYRequest($scope.user_id).then(function(resp) {
          console.log(resp.data);
          $scope.chkuser = resp.data;
          console.log($scope.chkuser);
          $scope.a='ok';
          if ($scope.chkuser == 1){
            $scope.GTKY ="false";
            console.log("False");
          }else if( $scope.chkuser == 0) {
            $scope.GTKY ="true";
            console.log("True");
          } 
          console.log("Outside");      
        });




  });

