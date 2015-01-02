'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ConfirmgtkyCtrl
 * @description
 * # ConfirmgtkyCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ConfirmgtkyCtrl', function ($scope,$location,$routeParams,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.UserId ={ };
     $scope.confirmGTKY = function(){
        $scope.UserId.id = $routeParams.user_id;
        console.log( $scope.UserId.id);
         profileOperations.addGTKYRequest($scope.UserId).then(function(response) {
          console.log(response.data);
          if (response.data == 'Already Present'){
             $location.url('/otherprofile?user_id='+$scope.UserId.id +'&already=1');
            // alert("GTKY Already Send.");
            // $location.path('/otherprofile');
          }else if (response.data == 'true'){
            $scope.GTKY ="true";
            // alert("Thank You. We have Send the request!");
            $location.url('/otherprofile?user_id='+$scope.UserId.id +'&msg=1');
          }            
        });

      };

      $scope.notNow = function(){
        $location.path('/otherprofile');

      };

  });
