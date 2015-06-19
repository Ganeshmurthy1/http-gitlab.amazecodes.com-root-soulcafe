'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminListQuestionCtrl
 * @description
 * # AdminListQuestionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminListQuestionCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    getAllQuestion();
    function getAllQuestion(){
	    adminOperations.getAllQuestions().then(function (response) {
				$scope.admins = response.data;
		});
    }

    $scope.sequence = function(a){
      adminOperations.updateQuestionSeq(a).then(function (response) {
        
    });
    }

    $scope.deleteQuestion = function(id){
      
      adminOperations.deleteQuestion(id).then(function (response) {
        
        if (response.data == 'true') {
          adminOperations.getAllQuestions().then(function (response) {
            $scope.admins = response.data;
          });
        };
    });
    }
  });
  
