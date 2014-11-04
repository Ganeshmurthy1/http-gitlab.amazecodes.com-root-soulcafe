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
    $scope.singleSelected = null;
    $scope.multipleSelected = null;   
    var orderlatest = 0;
    
    $scope.loadQuiz = function() {
    	Questionnaire.loadThisQuestions().then(function(response) {
    		$scope.QuestionObj = response.data;	
    		var max = $scope.QuestionObj.totalQn.totalQn;
    		var value = $scope.QuestionObj.totalAnsQn.totalAnsQn;
    		var per = value/max;
    		var percentage = per*100;    		
    		$scope.dynamic = Math.ceil(percentage);
    		if ($scope.QuestionObj.Questions.AnswerSelectionType == 1) {
				getSingleSelection();
			}
    		if ($scope.QuestionObj.Questions.AnswerSelectionType == 3) {
				getMultiSelection();
			}
    		
    		
    		
    		//$scope.options = $scope.QuestionObj.
    	});
    	
    	
    };    
    $scope.loadQuiz();
    function getSingleSelection() {
    	var singleOptions = new Object();
    	var options = $scope.QuestionObj.Options;
    	for ( var int = 0; int < options.length; int++) {
    		options[int].selected = false;
			singleOptions[options[int].Qoid] = options[int];
		}
    	$scope.singleOptions = singleOptions;
    	console.log(singleOptions);
    }
    
    function getMultiSelection() {
    	var multipleOptions = new Object();
    	var options = $scope.QuestionObj.Options;
    	for ( var int = 0; int < options.length; int++) {
    		options[int].order = null;
    		options[int].selected = false;
    		multipleOptions[options[int].Qoid] = options[int];
		}
    	$scope.multipleOptions = multipleOptions;
    	console.log(multipleOptions);
    }
    
    $scope.selectSingle = function(id) {
    
		if ($scope.singleSelected != null) {
			$scope.singleOptions[$scope.singleSelected].selected = false;
		}   	
		$scope.singleOptions[id].selected = true;
		$scope.singleSelected = id;
    }
    $scope.selectMultipe = function(id) {
    	
    	
    	if ($scope.multipleOptions[id].selected == true) {
    		$scope.multipleOptions[id].selected = false;
    		$scope.multipleOptions[id].order = null;
    		orderlatest = orderlatest - 1;
		}
    	else {
    		$scope.multipleOptions[id].selected = true;
    		$scope.multipleOptions[id].order = orderlatest + 1;
    		orderlatest = orderlatest + 1;
    		
    	}
			
		
    }
    
  });
