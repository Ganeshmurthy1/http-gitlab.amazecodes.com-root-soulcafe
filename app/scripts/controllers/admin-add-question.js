'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminAddQuestionCtrl
 * @description
 * # AdminAddQuestionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminAddQuestionCtrl', function ($scope, Questionnaire) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.question = [];
    $scope.answers = [];
    $scope.addItem = function() {
	  if ($scope.options != '') {
		  $scope.answers.push($scope.options.title);
    	  $scope.options = "";
	  }    	  
	  console.log($scope.answers);
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

      	  //$scope.options = "";
  	  }    	  
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
    	$scope.question.ansType = 0;
    	$scope.question.qnsCategory = 0;
    }
    
    loadAllData();
  });
