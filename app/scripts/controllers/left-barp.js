'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftBarpCtrl
 * @description
 * # LeftBarpCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftBarpCtrl', function ($scope, localStorageService, $routeParams,regService,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     $scope.LeftBarOther = 'views/left-barp.html';
     var config = localStorageService.get('config');
     $scope.imagepath = config.image_path;
     


     $scope.thumbup='true';
     $scope.user_id = $routeParams.user_id;

     profileOperations.getforumsOther($scope.user_id).then(function(response) { 
         $scope.discussion=response.data.forums;
         $scope.discussionTotal = response.data.forums_total;
         $scope.interest =response.data.intrst;
         $scope.udata = response.data.userdata;
         var d1 = new Date($scope.udata.birthdate);
        var d2 = new Date();
        $scope.diff = d2.getFullYear()-d1.getFullYear();    
     });

    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
  });
