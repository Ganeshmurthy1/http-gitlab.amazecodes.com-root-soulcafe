'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminEditQuestionCtrl
 * @description
 * # AdminEditQuestionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminEditQuestionCtrl', function ($scope, Questionnaire, $location, $routeParams) {
	    $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
	$scope.question = new Object();
  $scope.answers = [];
  $scope.multipleSelection = false;
  $scope.algorithamBoxSingle = false;  
  loadAllData();
  loadAllDetails();
  function loadAllDetails() {
	  Questionnaire.getQuestionDetail($routeParams.qid).then(function (response) {		
		  $scope.question.Qid = response.data.Questions.Qid;
		  $scope.question.title = response.data.Questions.QuestionTitle;
		  $scope.question.hint = response.data.Questions.Description;
		  $scope.question.ansType = response.data.Questions.AnswerSelectionType;
		  $scope.question.qnsCategory = response.data.Questions.QuestionCategory;
		  $scope.question.max_score = response.data.Questions.MaxScore;
		  $scope.question.algType = response.data.Questions.AlgorithamType;
      $scope.question.maxselection = response.data.Questions.MaxOptions;
      $scope.ToggleMaxInput(response.data.Questions.AnswerSelectionType);
      $scope.selectedOptions = response.data.Options;
      $scope.AlgOptions = response.data.Algoritham;
      $scope.ToggleAlgorithanType(response.data.Questions.AlgorithamType);
		  
	  });
	  
  }
  
  
  $scope.adminAddQuestion = function() {
  	$scope.question.answers = $scope.answers;
  	Questionnaire.editAdminQuestion($scope.question).then(function(response) {
	  if (response.data == 'true') {
		  $scope.question = new Object();
		  $scope.answers = [];
		  $scope.algSingleMatrix = new Object();
		  $scope.algMultipleMatrix = new Object();
		  $scope.algPersonalityMatch = new Object();
		  $scope.algDifferenceMatch = new Object();
		  $scope.savedSuccessfully = true;
      $scope.successmessage = "Question Added sucessfully.";
      $scope.errMessage = false;
      $scope.message = false;
      $location.path('/admin-list-question');
	  }
	  else {
		  $scope.successmessage = false;
		  $scope.errMessage = response.data;
	  }
     });


  };
  
  
  $scope.addItem = function() {
  if ($scope.options != '') {
	  var id = $scope.answers.indexOf($scope.options.title);
	  if (id < 0) {
		  $scope.answers.push($scope.options.title);
    	  $scope.options = "";
    	  var algType = $scope.question.algType;
    	  $scope.ToggleAlgorithanType(algType);
    	  $scope.ansMessage = '';
	  }
	  else {
		  $scope.ansMessage = 'Already Added';
	  }
  }    	  
  }
  
  $scope.remove = function(title) {
    var id = $scope.answers.indexOf(title);
	  if (id >= 0) {
	      $scope.answers.splice(id,1);
	      var algType = $scope.question.algType;
	      $scope.ToggleAlgorithanType(algType);
	  }    	  
  }
  
  $scope.ToggleMaxInput = function(ansType) {
  	if (ansType != 1) {
  		$scope.multipleSelection = true;
	}
  	else {
  		$scope.multipleSelection = false;
  	}
  }
  $scope.test = function() {    	
  }
  $scope.notSorted = function(obj){
      if (!obj) {
          return [];
      }
      return Object.keys(obj);
  }
  
  $scope.ToggleAlgorithanType = function(algType) {
  	var algSingleMatrix = new Object();
  	$scope.algorithamBoxMultiple = false;
	$scope.algorithamBoxSingle = false;
	$scope.algorithamBoxPersonality = false;
  	if (algType == 1) {
  		setSingleMatrix();
  		$scope.algorithamBoxSingle = true;
  		$scope.algorithamBoxMultiple = false;
  		$scope.algorithamBoxPersonality = false;
  	
  		
	}
  	else if (algType == 2) {
  		setMultipleMatrix();
  		$scope.algorithamBoxMultiple = true;
  		$scope.algorithamBoxSingle = false;
  		$scope.algorithamBoxPersonality = false;
  		$scope.maxCountErrorMessage = "";
  	
  		
	}
  	
  	else if (algType == 3) {
		setDifferenceMatch();
		$scope.algorithamBoxDifference = true;
		$scope.algorithamBoxPersonality = false;
		$scope.algorithamBoxMultiple = false;
		$scope.algorithamBoxSingle = false;
	
		
	}
  	else if (algType == 4) {
  		setPersonalityMatch();
  		$scope.algorithamBoxPersonality = true;
  		$scope.algorithamBoxMultiple = false;
  		$scope.algorithamBoxSingle = false;
  	
  		
	}
  	else {
  		
  	}
  }
  
  function setSingleMatrix() {
  	var ansTemp = new Object();
  	var answersy = [];
	for ( var int = 0; int < $scope.selectedOptions.length; int++) {
		answersy.push($scope.selectedOptions[int].Answer);
	}
	for ( var int2 = 0; int2 < $scope.answers.length; int2++) {
		answersy.push($scope.answers[int2]);
	}
  	
	for ( var x = 0; x < answersy.length; x++) {			
  		for ( var y = 0; y < answersy.length; y++) {
  			var index = answersy[x] + '*' + answersy[y];
  			if ($scope.AlgOptions[index]) {
  				ansTemp[index] = $scope.AlgOptions[index];
			}
  			else {
  				ansTemp[index] = 0;	
  			}
   						
		}
	}
	$scope.algSingleMatrix = ansTemp;
	$scope.question.algSingleMatrix = $scope.algSingleMatrix;	
  }
  
  function setMultipleMatrix() {
  	var maxSelection = $scope.question.maxselection;
  	var ansTemp = new Object();
	var answersy = $scope.answers;
	for ( var x = 0; x < maxSelection; x++) {			
  		for ( var y = 0; y < maxSelection; y++) {
  			var index = (x+1) + '*' + (y+1);
   			ansTemp[index] = $scope.AlgOptions[index];				
		}
	}
	$scope.algMultipleMatrix = ansTemp;	
	$scope.question.algMultipleMatrix = $scope.algMultipleMatrix;
  }
  
  function setDifferenceMatch() {	  
	var ansTemp = new Object();
	var answersy = $scope.answers;		
	for ( var y = 0; y < $scope.AlgOptions.length; y++) {
		var index =  answersy[y];
		ansTemp[index] = '';				
	}		
	$scope.algDifferenceMatch =  $scope.AlgOptions;
	$scope.question.algDifferenceMatch = $scope.algDifferenceMatch;	    	
  }
  
  function setPersonalityMatch() {    	
  	var ansTemp = new Object();
	var answersy = $scope.answers;		
	for ( var y = 0; y < $scope.AlgOptions.length; y++) {
		var index =  answersy[y];
		ansTemp[index] = '';				
	}		
	$scope.algPersonalityMatch =  $scope.AlgOptions;
	$scope.question.algPersonalityMatch = $scope.algPersonalityMatch;
  }
  
  function loadAllData() {
  	Questionnaire.getAllQuestionCategory().then(function (response) {
		$scope.qnsCategory = response.data;	    	
	});
  	Questionnaire.getAllQuestionType().then(function (response) {
		$scope.qnsTypes = response.data;	    	
	});
  	Questionnaire.getAllAlgorithamType().then(function (response) {
		$scope.algTypes = response.data;	    	
	});
  	$scope.question.ansType = '';
  	$scope.question.qnsCategory = '';
  	$scope.question.algType = '';
  	
  }
  $scope.editOption = function(Qid) {
	  Questionnaire.addEditQuestionOption(Qid).then(function (response) {	    	
		});
	  
  }
  
  
});