'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminTopicViewCtrl
 * @description
 * # AdminTopicViewCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminTopicViewCtrl', function ($scope, $routeParams,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var authData = localStorageService.get('authorizationData');

    $scope.userId=authData.user_id;
    
    getForumComments();
    
    function getForumComments() {
     regService.getdiscussionTopicName($routeParams.topicId).then(function (results) {
       $scope.topicName = results.data[0].TopicTitle;        
       });


     regService.getdiscussionTopicComments($routeParams.topicId).then(function (results) {
    	  $scope.comments = results.data; 
      });
    }




   $scope.abuseReport = function(arg) {
       regService.saveDiscussionboardAbuse(arg).then(function (results) {
        });
       };


   $scope.commentLike = function(arg) {
       regService.setCommentsLike(arg).then(function (results) {
    	   getForumComments();
       });
       };

       $scope.addcomment = function() {

	      var comm=$scope.comment;	       
	      var args=new Object();	
	      args.topicId=$routeParams.topicId;
	      args.comment=$scope.comment;	     	
	      regService.saveComments(args).then(function (results) {
	    	 getForumComments();
	   });



       };
  });
