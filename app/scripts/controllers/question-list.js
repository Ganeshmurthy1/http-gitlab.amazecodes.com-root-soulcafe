'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:QuestionListCtrl
 * @description
 * # QuestionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('QuestionListCtrl', function ($scope, Questionnaire) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    getAllQuestion();
    function getAllQuestion(){
    	Questionnaire.getAllQuestionsUser().then(function (response) {
				$scope.questions = response.data;
		});
    }
  });
