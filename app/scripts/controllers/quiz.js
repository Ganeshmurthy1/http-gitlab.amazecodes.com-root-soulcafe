'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:QuizCtrl
 * @description
 * # QuizCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('QuizCtrl', function ($scope, Questionnaire) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    $scope.loadQuiz = function() {
    	Questionnaire.loadThisQuestions().then(function(response) {
    		$scope.QuestionObj = response.data;	
    		console.log($scope.QuestionObj.totalQn);
    		console.log($scope.QuestionObj.totalQn[0].totalQn);
    	});
    	
    	
    };
    
    
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();
    $scope.loadQuiz();
    
  });
