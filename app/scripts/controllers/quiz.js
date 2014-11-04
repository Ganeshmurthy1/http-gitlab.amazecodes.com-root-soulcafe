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
    var multipleOrdered = [];
    
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
    		options[int].orderText = null;
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
    		
    		var optid = multipleOrdered.indexOf(id);
    		
    		 if (optid >= 0) {
    			 multipleOrdered.splice(optid, 1);
    		 }
    		if ($scope.multipleOptions[id].order < orderlatest) {
    			for ( var int = 0; int < multipleOrdered.length; int++) {
    				if ($scope.multipleOptions[multipleOrdered[int]].order >  $scope.multipleOptions[id].order) {
	    				$scope.multipleOptions[multipleOrdered[int]].order = $scope.multipleOptions[multipleOrdered[int]].order - 1;
	    				if ($scope.multipleOptions[multipleOrdered[int]].order == 1) {
	    					$scope.multipleOptions[multipleOrdered[int]].orderText = $scope.multipleOptions[multipleOrdered[int]].order + 'st';
	    				}
	    	    		else if ($scope.multipleOptions[multipleOrdered[int]].order == 2) {
	    	    			$scope.multipleOptions[multipleOrdered[int]].orderText = $scope.multipleOptions[multipleOrdered[int]].order + 'nd';
	    				}
	    	    		else if ($scope.multipleOptions[multipleOrdered[int]].order == 3) {
	    	    			$scope.multipleOptions[multipleOrdered[int]].orderText = $scope.multipleOptions[multipleOrdered[int]].order + 'rd';
	    				}
	    	    		else {
	    	    			$scope.multipleOptions[multipleOrdered[int]].orderText = $scope.multipleOptions[multipleOrdered[int]].order + 'th';
	    				}
    				}
				}
				
			}
    		$scope.multipleOptions[id].selected = false;
    		$scope.multipleOptions[id].order = null;
    		$scope.multipleOptions[id].orderText = null;
    		orderlatest = orderlatest - 1;
		}
    	else {
    		$scope.multipleOptions[id].selected = true;
    		$scope.multipleOptions[id].order = orderlatest + 1;
    		if ($scope.multipleOptions[id].order == 1) {
    			$scope.multipleOptions[id].orderText = $scope.multipleOptions[id].order + 'st';
			}
    		else if ($scope.multipleOptions[id].order == 2) {
    			$scope.multipleOptions[id].orderText = $scope.multipleOptions[id].order + 'nd';
			}
    		else if ($scope.multipleOptions[id].order == 3) {
    			$scope.multipleOptions[id].orderText = $scope.multipleOptions[id].order + 'rd';
			}
    		else {
    			$scope.multipleOptions[id].orderText = $scope.multipleOptions[id].order + 'th';
			}
    		orderlatest = orderlatest + 1;
    		multipleOrdered.push(id);
    		
    	}
    	console.log(multipleOrdered);
			
		
    }
    
  });
