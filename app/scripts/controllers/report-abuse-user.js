'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ReportAbuseUserCtrl
 * @description
 * # ReportAbuseUserCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ReportAbuseUserCtrl', function ($scope,$location,$routeParams,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
$scope.reportAbuse ={};

    $scope.sendReportAbuse = function(mess){
        // $location.path('/dashboard-anon');
        $scope.reportAbuse.id = $routeParams.user_id;
        $scope.reportAbuse.message = mess;
        console.log($scope.reportAbuse);

        profileOperations.addAbuseUser($scope.reportAbuse).then(function(response) {
          console.log(response.data);
          if (response.data = 'true'){
            alert("Thank You. We will take Necessary action!");
            $location.path('/dashboard-anon');
          }            
        });
      };

  });
