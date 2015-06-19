'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditForumCtrl
 * @description
 * # EditForumCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditForumCtrl', function ($scope,adminDiscussion,$routeParams,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.discussId = $routeParams.id;

    adminDiscussion.getforum($scope.discussId).then(function (results) {
        $scope.forum = results.data;    
      });


    $scope.editForum = function(){
      adminDiscussion.editforum($scope.forum).then(function (res) {
       if(res.data == 'true'){
        $location.path("/discussion-list");
       }
      });

    }
 


  });
