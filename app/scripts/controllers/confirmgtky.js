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
          console.log(response.data);
          if (response.data = 'true'){
            $scope.GTKY ="true";
            alert("Thank You. We have Send the request!");
            $location.path('/dashboard-anon');
          }            
        });

      };

      $scope.notNow = function(){
        $location.path('/dashboard-anon');

      };

  });
