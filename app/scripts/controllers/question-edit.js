'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:QuestionEditCtrl
 * @description
 * # QuestionEditCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('QuestionEditCtrl', function ($scope, Questionnaire, $location, $routeParams, $anchorScroll, analytics) {
	    $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  analytics.logPageLoad($scope, $location.absUrl(), $location.path());  
  
  $scope.demo6 = {
	    valueA: 5,
	    valueB: 3000
	};
  
  $scope.loadQuiz = function() {
  	$scope.singleSelected = null;
	  $scope.multipleSelected = null;   
	  $scope.orderlatest = 0;
	  $scope.multipleOrdered = [];
  	Questionnaire.loadThisQuestionById($routeParams.qid).then(function(response) {
  		$scope.QuestionObj = response.data;	
  		
  		if ($scope.QuestionObj.Questions.AnswerSelectionType == 1) {
			getSingleSelection();
			$scope.selectSingle($scope.QuestionObj.Answers[0].OptionId)
		}
  		if ($scope.QuestionObj.Questions.AnswerSelectionType == 2) {
			getMultiIntensitySelection();
			for ( var int = 0; int < $scope.QuestionObj.Answers.length; int++) {
				$scope.selectMultipleIntensity($scope.QuestionObj.Answers[int].OptionId);
				$scope.multiIntensityOptions[$scope.QuestionObj.Answers[int].OptionId].intensity = $scope.QuestionObj.Answers[int].RankScale;
			}
			console.log($scope.multiIntensityOptions);
			for ( var int2 = 0; int2 < $scope.multiIntensityOptions.length; int2++) {
				
			}
			
			
		}
  		if ($scope.QuestionObj.Questions.AnswerSelectionType == 3) {
			getMultiSelection();
			for ( var int = 0; int < $scope.QuestionObj.Answers.length; int++) {
				$scope.selectMultipe($scope.QuestionObj.Answers[int].OptionId);
			}
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
  }
  
  function getMultiIntensitySelection() {
  	var multiIntensityOptions = new Object();
  	var options = $scope.QuestionObj.Options;
  	for ( var int = 0; int < options.length; int++) {
  		options[int].selected = false;
  		options[int].intensity = 0;
  		multiIntensityOptions[options[int].Qoid] = options[int];
	}
  	$scope.multiIntensityOptions = multiIntensityOptions;
  }
  
  $scope.selectSingle = function(id) {
  
	if ($scope.singleSelected != null) {
		$scope.singleOptions[$scope.singleSelected].selected = false;
	}   	
	$scope.singleOptions[id].selected = true;
	$scope.singleSelected = id;
  }
  $scope.selectMultipleIntensity = function(id) {        
  	
  	if ($scope.multiIntensityOptions[id].selected == true) {
  		$scope.multiIntensityOptions[id].selected = false;
  	}
  	else {
  		$scope.multiIntensityOptions[id].selected = true;
  	}
	
  }
  $scope.selectMultipe = function(id) {
  	
  	
  	if ($scope.multipleOptions[id].selected == true) {
  		
  		var optid = $scope.multipleOrdered.indexOf(id);
  		
  		 if (optid >= 0) {
  			 $scope.multipleOrdered.splice(optid, 1);
  		 }
  		if ($scope.multipleOptions[id].order < $scope.orderlatest) {
  			for ( var int = 0; int < $scope.multipleOrdered.length; int++) {
  				if ($scope.multipleOptions[$scope.multipleOrdered[int]].order >  $scope.multipleOptions[id].order) {
    				$scope.multipleOptions[$scope.multipleOrdered[int]].order = $scope.multipleOptions[$scope.multipleOrdered[int]].order - 1;
    				if ($scope.multipleOptions[$scope.multipleOrdered[int]].order == 1) {
    					$scope.multipleOptions[$scope.multipleOrdered[int]].orderText = $scope.multipleOptions[$scope.multipleOrdered[int]].order + 'st';
    				}
    	    		else if ($scope.multipleOptions[$scope.multipleOrdered[int]].order == 2) {
    	    			$scope.multipleOptions[$scope.multipleOrdered[int]].orderText = $scope.multipleOptions[$scope.multipleOrdered[int]].order + 'nd';
    				}
    	    		else if ($scope.multipleOptions[$scope.multipleOrdered[int]].order == 3) {
    	    			$scope.multipleOptions[$scope.multipleOrdered[int]].orderText = $scope.multipleOptions[$scope.multipleOrdered[int]].order + 'rd';
    				}
    	    		else {
    	    			$scope.multipleOptions[$scope.multipleOrdered[int]].orderText = $scope.multipleOptions[$scope.multipleOrdered[int]].order + 'th';
    				}
  				}
			}
			
		}
  		$scope.multipleOptions[id].selected = false;
  		$scope.multipleOptions[id].order = null;
  		$scope.multipleOptions[id].orderText = null;
  		$scope.orderlatest = $scope.orderlatest - 1;
	}
  	else {
  		if ($scope.QuestionObj.Questions.MaxOptions == $scope.multipleOrdered.length) {
  			$scope.errMessage = 'Maximum Selection is ' + $scope.QuestionObj.Questions.MaxOptions;
  			$anchorScroll();
  			return;
  			
  		}
  		$scope.multipleOptions[id].selected = true;
  		$scope.multipleOptions[id].order = $scope.orderlatest + 1;
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
  		$scope.orderlatest = $scope.orderlatest + 1;
  		$scope.multipleOrdered.push(id);
  		
  	}
  	
	
  }
  
  $scope.addAnswer = function() {
  	
  	if ($scope.QuestionObj.Questions.AnswerSelectionType == 1) {
  		if ($scope.singleSelected == null) {
  			$scope.errMessage = "Please select something :(";			
            $anchorScroll();
  			return;
  		}
  		
  	}
  	if ($scope.QuestionObj.Questions.AnswerSelectionType == 3) {
  		if ($scope.multipleOrdered.length == 0) {
  			$scope.errMessage = "Please select something :(";			
            $anchorScroll();
  			return;
		}
  		
  	}
  	
  	
  	
  	
  	var answerSet = new Object();
  	answerSet.question = $scope.QuestionObj.Questions;
  	if (typeof($scope.singleSelected) != "undefined") {
  		answerSet.answer = $scope.singleSelected;
  	}
  	
  	if (typeof($scope.multiIntensityOptions) != "undefined")
  	answerSet.answerInten = $scope.multiIntensityOptions;
  	
  	if (typeof($scope.multipleOptions) != "undefined")
  	answerSet.answerMulti = $scope.multipleOptions;
  	Questionnaire.updateAnswer(answerSet).then(function(response) {
  		$location.url('/edit-profile-new?exp=true');
  		
  	});
  }
  
});
