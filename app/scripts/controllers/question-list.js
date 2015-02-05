'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:QuestionListCtrl
 * @description
 * # QuestionListCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('QuestionListCtrl', function ($scope, Questionnaire, $location, analytics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    analytics.logPageLoad($scope, $location.absUrl(), $location.path()); 
    
    getAllQuestion();
    function getAllQuestion(){
    	Questionnaire.getAllQuestionsUser().then(function (response) {
				$scope.questions = response.data;
		});
    }
  });
