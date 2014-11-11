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
	    
  loadAllDetails();
  function loadAllDetails() {
	  Questionnaire.getQuestionDetail($routeParams.qid).then(function (response) {		
		  $scope.question.title = response.data.QuestionTitle;
		  $scope.question.hint = response.data.Description;
		  $scope.question.ansType = response.data.AnswerSelectionType;
		  $scope.question.qnsCategory = response.data.QuestionCategory;
		  
	  });
	  
  }
  $scope.question = new Object();
  $scope.answers = [];
  $scope.multipleSelection = false;
  $scope.algorithamBoxSingle = false;
  
  $scope.adminAddQuestion = function() {
  	console.log($scope.question);
  	$scope.question.answers = $scope.answers;
  	Questionnaire.addAdminQuestion($scope.question).then(function(response) {
	  console.log(response.data);
	  if (response.data == 'true') {
		  $scope.question = new Object();
		  $scope.answers = [];
		  $scope.algSingleMatrix = new Object();
		  $scope.algMultipleMatrix = new Object();
		  $scope.algPersonalityMatch = new Object();
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
    	 // setSingleMatrix();
    	  $scope.ansMessage = '';
	  }
	  else {
		  $scope.ansMessage = 'Already Added';
	  }
  }    	  
  console.log(id);
  }
  
  $scope.remove = function(title) {
    console.log($scope.answers);
    console.log(title);
    var id = $scope.answers.indexOf(title);
    console.log(id);
	  if (id >= 0) {
		console.log($scope.answers);
		  console.log('as');
	      $scope.answers.splice(id,1);
	      var algType = $scope.question.algType;
	      $scope.ToggleAlgorithanType(algType);
    	  //$scope.options = "";
	  }    	  
  }
  
  $scope.ToggleMaxInput = function(ansType) {
  	if (ansType != 1) {
  		$scope.multipleSelection = true;
	}
  	else {
  		$scope.multipleSelection = false;
  	}
	 
	  console.log(ansType);
  }
  $scope.test = function() {    	
	  console.log($scope.algSingleMatrix);
  }
  $scope.notSorted = function(obj){
      if (!obj) {
          return [];
      }
      return Object.keys(obj);
  }
  
  $scope.ToggleAlgorithanType = function(algType) {
  	console.log($scope.algSingleMatrix);
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
  		if ($scope.answers.length < $scope.question.maxselection) {
			$scope.maxCountErrorMessage = "Please correct the max Selection option";
			return;
		}
  		setMultipleMatrix();
  		$scope.algorithamBoxMultiple = true;
  		$scope.algorithamBoxSingle = false;
  		$scope.algorithamBoxPersonality = false;
  		$scope.maxCountErrorMessage = "";
  	
  		
	}
  	else if (algType == 4) {
  		setPersonalityMatch();
  		$scope.algorithamBoxPersonality = true;
  		$scope.algorithamBoxMultiple = false;
  		$scope.algorithamBoxSingle = false;
  	
  		
	}
  	else {
  		//$scope.multipleSelection = false;
  	}
	 
	 // console.log(ansType);
  }
  
  function setSingleMatrix() {
  	var ansTemp = new Object();
	var answersy = $scope.answers;
	for ( var x = 0; x < answersy.length; x++) {			
  		for ( var y = 0; y < answersy.length; y++) {
  			var index = answersy[x] + '*' + answersy[y];
   			ansTemp[index] = 0;				
		}
	}
	$scope.algSingleMatrix = ansTemp;
	$scope.question.algSingleMatrix = $scope.algSingleMatrix;
	
//	                      		var answersy = $scope.answers;
//	                      		console.log(answersy);
//	                      		var ansTemp = new Object();
//	                      		for ( var int = 0; int < answersy.length; int++) {
//	                      			ansTemp[answersy[int]] = 0;
//	                      			
//	                      		}
//	                      		for ( var int = 0; int < answersy.length; int++) {
//	                      			algSingleMatrix[answersy[int]] = ansTemp;
//	                      			console.log(answersy[int]);
//	                      		}
//	                      		    		
//	                      		
//	                      		$scope.algSingleMatrix = algSingleMatrix;
	console.log($scope.algSingleMatrix);
	
  }
  
  function setMultipleMatrix() {
  	var maxSelection = $scope.question.maxselection;
  	var ansTemp = new Object();
	var answersy = $scope.answers;
	for ( var x = 0; x < maxSelection; x++) {			
  		for ( var y = 0; y < maxSelection; y++) {
  			var index = (x+1) + '*' + (y+1);
   			ansTemp[index] = 0;				
		}
	}
	$scope.algMultipleMatrix = ansTemp;	
	$scope.question.algMultipleMatrix = $scope.algMultipleMatrix;
	//console.log($scope.algMultipleMatrix);
  }
  
  function setPersonalityMatch() {    	
  	var ansTemp = new Object();
	var answersy = $scope.answers;		
	for ( var y = 0; y < answersy.length; y++) {
		var index =  answersy[y];
		ansTemp[index] = '';				
	}		
	$scope.algPersonalityMatch = ansTemp;
	$scope.question.algPersonalityMatch = $scope.algPersonalityMatch;
  }
  
  function loadAllData() {
  	Questionnaire.getAllQuestionCategory().then(function (response) {
		//console.log(response);
		$scope.qnsCategory = response.data;	    	
	});
  	Questionnaire.getAllQuestionType().then(function (response) {
		//console.log(response);
		$scope.qnsTypes = response.data;	    	
	});
  	Questionnaire.getAllAlgorithamType().then(function (response) {
		//console.log(response);
		$scope.algTypes = response.data;	    	
	});
  	$scope.question.ansType = '';
  	$scope.question.qnsCategory = '';
  	$scope.question.algType = '';
  	
  }
  
  loadAllData();
});