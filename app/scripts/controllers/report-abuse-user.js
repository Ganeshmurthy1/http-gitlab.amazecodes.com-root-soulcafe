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
        $scope.reportAbuse.id = $routeParams.user_id;
        $scope.reportAbuse.message = mess;
        profileOperations.addAbuseUser($scope.reportAbuse).then(function(response) {
          if (response.data = 'true'){
            $location.url('/otherprofile?user_id=' + $routeParams.user_id + '&q=106' );
          }            
        });
      };

  });
