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
         profileOperations.addGTKYRequest($scope.UserId).then(function(response) {
          if (response.data == 'Already Present'){
             $location.url('/otherprofile?user_id='+$scope.UserId.id +'&q=109');
          }else if (response.data == 'true'){
            $scope.GTKY ="true";
            $location.url('/otherprofile?user_id='+$scope.UserId.id +'&q=107');
          }            
        });

      };

      $scope.notNow = function(){
        $location.path('/otherprofile');

      };

  });
