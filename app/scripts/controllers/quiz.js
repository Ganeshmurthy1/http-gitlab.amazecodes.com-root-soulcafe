'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:QuizCtrl
 * @description
 * # QuizCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('QuizCtrl', function ($scope, Questionnaire, $location, $anchorScroll) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $location.hash('msg');
    $anchorScroll();
    $scope.demo6 = {
		    valueA: 5,
		    valueB: 3000
		};
    
    $scope.loadQuiz = function() {
    	$scope.singleSelected = null;
        $scope.multipleSelected = null;   
        $scope.orderlatest = 0;
        $scope.multipleOrdered = [];
    	Questionnaire.loadThisQuestions().then(function(response) {
    		$scope.QuestionObj = response.data;	
    		var max = $scope.QuestionObj.totalQn.totalQn;
    		var value = $scope.QuestionObj.totalAnsQn.totalAnsQn;
    		if(value == max) {
    			$location.path('/home');
    		}
    		var per = value/max;
    		var percentage = per*100;    		
    		$scope.dynamic = Math.ceil(percentage);
    		if ($scope.QuestionObj.Questions.AnswerSelectionType == 1) {
				getSingleSelection();
			}
    		if ($scope.QuestionObj.Questions.AnswerSelectionType == 2) {
				getMultiIntensitySelection();
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
    
    function getMultiIntensitySelection() {
    	var multiIntensityOptions = new Object();
    	var options = $scope.QuestionObj.Options;
    	for ( var int = 0; int < options.length; int++) {
    		options[int].selected = false;
    		options[int].intensity = 0;
    		multiIntensityOptions[options[int].Qoid] = options[int];
		}
    	$scope.multiIntensityOptions = multiIntensityOptions;
    	console.log(multiIntensityOptions);
    }
    
    $scope.selectSingle = function(id) {
    
		if ($scope.singleSelected != null) {
			$scope.singleOptions[$scope.singleSelected].selected = false;
		}   	
		$scope.singleOptions[id].selected = true;
		$scope.singleSelected = id;
		console.log($scope.singleSelected);
    }
    $scope.intensitySel = 0;
    $scope.selectMultipleIntensity = function(id) {        
    	
    	if ($scope.multiIntensityOptions[id].selected == true) {
    		$scope.multiIntensityOptions[id].selected = false;
    		$scope.intensitySel--;
    	}
    	else {
    		$scope.multiIntensityOptions[id].selected = true;
    		$scope.intensitySel++;
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
    			//alert('Maximum Selection is ' + $scope.QuestionObj.Questions.MaxOptions );
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
    	console.log($scope.multipleOrdered);
			
		
    }
    $scope.errMessage = '';
    $scope.addAnswer = function() {
    	$scope.errMessage = '';
    	if ($scope.QuestionObj.Questions.AnswerSelectionType == 1) {
    		//console.log($scope.singleSelected);
    		if ($scope.singleSelected == null) {
    			//alert('Please select something :(');
    			$scope.errMessage = "Please select something :(";
    			
                $anchorScroll();
    			return;
    		}
    		
    	}
    	if ($scope.QuestionObj.Questions.AnswerSelectionType == 2) {
    		//alert('ppp');
    		if ($scope.intensitySel == 0) {
    			$scope.errMessage = "Please select something :(";
    			$anchorScroll();
    			return;
			}
    		
    	}
    	if ($scope.QuestionObj.Questions.AnswerSelectionType == 3) {
    		if ($scope.multipleOrdered.length == 0) {
    			//alert('Please select something :(');
    			$scope.errMessage = "Please select something :(";
    			$anchorScroll();
    			return;
			}
    		
    	}
    	
    	
    	
    	
    	
    	var answerSet = new Object();
    	answerSet.question = $scope.QuestionObj.Questions;
    	if (typeof($scope.singleSelected) != "undefined") {
    		console.log($scope.singleSelected);
    		answerSet.answer = $scope.singleSelected;
    	}
    	
    	if (typeof($scope.multiIntensityOptions) != "undefined")
    	answerSet.answerInten = $scope.multiIntensityOptions;
    	
    	if (typeof($scope.multipleOptions) != "undefined")
    	answerSet.answerMulti = $scope.multipleOptions;
    	
    	console.log(answerSet);
    	Questionnaire.addAnswer(answerSet).then(function(response) {
    		$scope.loadQuiz();
    		
    	});
    }
    
  });
