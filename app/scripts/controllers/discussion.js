'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:DiscussionCtrl
 * @description
 * # DiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('DiscussionCtrl', function ($scope,$routeParams,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",$routeParams.topic);
      regService.getdiscussionTopicComments($routeParams.topic).then(function (results) {

     	console.log("susess");
     	  $scope.comments = results.data; 

     	
     	  console.log("datassss",$scope.comments);

     });


     ;
  });
